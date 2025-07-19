import express from "express";
import { User } from "../../../expressjs/src/models/users.mjs";

const AuthRouter = express.Router();

AuthRouter.post("/register", async (req, res) => {
  try {
    const newUserInfo = req.body;
    if (!newUserInfo) throw new Error("Incomplete Credentials");
    const newUser = await User.create(newUserInfo);

    await newUser.save();

    res.status(200).send({
      message: `Created User`,
      user: newUser,
    });
  } catch (err) {
    console.error({ registrationError: err });
  }
});

AuthRouter.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers)
      return res.status(200).send({
        message: "No users in database",
      });

    res.status(200).send({
      message: "get successfull",
      users: allUsers,
    });
  } catch (err) {
    console.error(err);
  }
});

export default AuthRouter;
