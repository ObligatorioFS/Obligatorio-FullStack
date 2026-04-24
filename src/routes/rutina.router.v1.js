import express from "express"
import { crearRutinaController, obtenerRutinas, obtenerRutinaPorSuId } from "../controllers/rutina.controller.js"
import { crearRutinaValidatorSchemaMiddleware } from "../middlewares/crear.rutina.validator.middeleare.js";




const rutinaRouterV1 = express.Router();

//Crear
rutinaRouterV1.post("/rutinas", crearRutinaValidatorSchemaMiddleware, crearRutinaController);
//Obtener
rutinaRouterV1.get("/rutinas", obtenerRutinas)
rutinaRouterV1.get("/rutinas/:id", obtenerRutinaPorSuId)


export { rutinaRouterV1 }