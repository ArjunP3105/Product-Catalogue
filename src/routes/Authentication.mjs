import express from "express";

import { Users } from "../database/users.mjs";
import passport from "passport";

const AuthRouter = express.Router();

AuthRouter.post("/register", async (req, res) => {
  try {
    const newUserInfo = req.body;
    console.log(req.body);
    if (!newUserInfo) throw new Error("Incomplete Credentials");
    const newUser = await Users.create(newUserInfo);

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
    const allUsers = await Users.find();

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

AuthRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send({
    message: "logged in sucessfully",
  });
});

AuthRouter.get("/status", (req, res) => {
  const currUserData = req.user;

  if (!currUserData)
    return res.status(401).send({
      error: "not logged in",
    });

  res.status(200).send({
    user: currUserData,
  });
});

AuthRouter.get("/logout", (req, res) => {
  try {
  } catch {}
});

export default AuthRouter;
