import express from "express"
import { crearSalaController } from "../controllers/sala.controller.v1.js"
import { crearSalaValidatorSchemaMiddleware } from "../middlewares/crear.sala.validator.middleware.js"
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js";

const salaRouterV1 = express.Router();

salaRouterV1.post("/salas", soloAdminMiddleware, crearSalaValidatorSchemaMiddleware, crearSalaController);

export { salaRouterV1 }