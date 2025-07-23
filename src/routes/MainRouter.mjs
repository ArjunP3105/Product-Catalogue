import express from "express";
import AuthRouter from "./Authentication.mjs";
import catalogRouter from "./CatalogRouter.mjs";

const mainRouter = express.Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/catalog", catalogRouter);
export default mainRouter;
