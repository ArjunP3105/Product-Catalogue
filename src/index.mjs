import express from "express";
import passport from "passport";
import mongoose from "mongoose";

const app = express();

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

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ message: "Hello Welcome to the Product Catalog" });
});

app.listen(PORT);
