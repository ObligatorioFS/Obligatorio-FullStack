import express from "express"
import { crearRutinaController, obtenerRutinasPendientes, obtenerRutinaPorSuId, obtenerRutinasPorUsuario, agregarEjerciciosARutina } from "../controllers/rutina.controller.js"
import { crearRutinaValidatorSchemaMiddleware } from "../middlewares/crear.rutina.validator.middeleare.js";
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js";




const rutinaRouterV1 = express.Router();

//Crear
rutinaRouterV1.post("/rutinas", crearRutinaValidatorSchemaMiddleware, crearRutinaController);
//Obtener
rutinaRouterV1.get("/rutinas", soloAdminMiddleware,  obtenerRutinasPendientes);
rutinaRouterV1.get("/rutinas/rutinas-usuario", obtenerRutinasPorUsuario)
rutinaRouterV1.get("/rutinas/:id", obtenerRutinaPorSuId)
//Modificar
rutinaRouterV1.put("/rutinas/:id", soloAdminMiddleware, agregarEjerciciosARutina);


export { rutinaRouterV1 }
