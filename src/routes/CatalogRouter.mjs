import express from "express";
import { Catalog } from "../database/catalog.mjs";
import {
  body,
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import { catalogSchema } from "../Schema/catalogSchema.mjs";

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

export default catalogRouter;
