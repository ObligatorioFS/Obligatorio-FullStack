import express from "express"
import { ping } from "../controllers/pingcontoller.js";

const pingRouter = express.Router();

pingRouter.get('/ping', ping)

export { pingRouter }