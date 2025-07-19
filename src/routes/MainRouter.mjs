import express from "express";
import AuthRouter from "./Authentication.mjs";

const mainRouter = express.Router();

mainRouter.use("/auth", AuthRouter);

export default mainRouter;
