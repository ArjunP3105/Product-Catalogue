import express from "express";
import { Catalog } from "../database/catalog.mjs";
import {
  body,
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import { catalogSchema } from "../Schema/catalogSchema.mjs";
import mongoose from "mongoose";

const catalogRouter = express.Router();

//get all items from catalog

catalogRouter.get("/items", async (req, res) => {
  const { category } = req.query;

  if (category) {
    const searchCatalog = await Catalog.find({ category });

    if (searchCatalog.length === 0) return res.status(404);

    return res.status(200).send({
      searchCatalog,
    });
  }

  const catalog = await Catalog.find();

  res.status(200).send({
    catalog: catalog,
  });
});

catalogRouter.post(
  "/items/add",
  checkSchema(catalogSchema),
  async (req, res) => {
    const result = validationResult(req);
    const currUser = req.user;

    if (!currUser)
      return res.status(404).send({
        success: false,
        error: "Not Logged in",
      });

    if (currUser.status !== "admin")
      return res.status(400).send({
        success: false,
        error: "admin permissions required to add items",
      });

    if (!result.isEmpty)
      return res.status(400).send({
        error: result.array(),
      });

    const data = matchedData(req);

    const newItem = await Catalog.create(data);

    await newItem.save();

    return res.status(200).send({
      message: "added item",
      item: newItem,
    });
  }
);

// deleting an item

catalogRouter.delete("/items/delete/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const currUser = req.user;

  console.log(currUser);

  if (!mongoose.Types.ObjectId.isValid(itemId))
    return res.status(400).send({
      success: false,
      message: "invalid format",
    });
  if (currUser === undefined)
    return res.status(404).send({
      error: "only authenticated users can delete items",
    });

  if (currUser.status !== "admin")
    return res.status(400).send({
      success: false,
      error: "admin permissions required to add items",
    });

  if (!itemId)
    return res.status(404).send({
      error: "No id provided ",
    });

  const item = await Catalog.findById(itemId);

  if (!item)
    return res.status(404).send({
      message: "no such item exists",
    });

  await item.deleteOne();

  const currItems = await Catalog.find();

  res.status(200).send({
    success: true,
    message: "item deleted",
    "updated catalog": currItems,
  });
});

catalogRouter.patch("/items/update/:itemId", async (req, res) => {
  try {
    const currUser = req.user;
    const updatedInfo = req.body;
    const { itemId } = req.params;

    if (!currUser) throw new Error("Not authenticated ");

    if (currUser.status !== "admin")
      throw new Error("Admin permisions required to update item ");

    if (!itemId) throw new Error("Id not provided");

    if (!updatedInfo) throw new Error("No details provided");

    if (!mongoose.Types.ObjectId.isValid(itemId))
      throw new Error("Invalid id format");

    const item = await Catalog.findById(itemId);

    if (!item) return res.status(404);

    const updatedData = await Catalog.updateOne(
      { _id: itemId },
      { $set: updatedInfo }
    ); // $set this replaces the sets when updated

    if (updatedData === null)
      throw new Error("Coudnt update item , check the data sent");

    const updatedItem = await Catalog.findById(itemId);

    return res.status(200).send({
      success: true,
      updatedItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      error: err,
    });
  }
});

export default catalogRouter;
