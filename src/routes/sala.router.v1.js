import express from "express"
import { crearSalaController, obtenerSalas, obtenerSalaPorSuId, modificarSala  } from "../controllers/sala.controller.v1.js"
import { crearSalaValidatorSchemaMiddleware } from "../middlewares/crear.sala.validator.middleware.js"
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js";

const salaRouterV1 = express.Router();

salaRouterV1.post("/salas", soloAdminMiddleware, crearSalaValidatorSchemaMiddleware, crearSalaController);
salaRouterV1.get("/salas", soloAdminMiddleware ,obtenerSalas )
salaRouterV1.get("/salas/:id", soloAdminMiddleware, obtenerSalaPorSuId )
salaRouterV1.put("/salas/:id", soloAdminMiddleware, modificarSala )

export { salaRouterV1 }