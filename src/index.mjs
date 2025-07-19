import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import "./stratergies/local-stratergies.mjs";
import { User } from "../../expressjs/src/models/users.mjs";
import mainRouter from "./routes/MainRouter.mjs";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "arjun-dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/product-catalogue")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error({
      databaseError: err,
    });
  });

app.use(passport.initialize()); //initilising the passport
app.use(passport.session()); //enabling passport sessions

//serialising the user data from passport and adding it to the session id

passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialising the userid and getting the user

passport.deserializeUser((id, done) => {
  try {
    const currUser = User.findById(id);

    if (!currUser) throw new Error("user doesnt exist");

    done(null, currUser);
  } catch (err) {
    done(err, null);
  }
});

app.use("/api", mainRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ message: "Hello Welcome to the Product Catalog" });
});

app.listen(PORT);
