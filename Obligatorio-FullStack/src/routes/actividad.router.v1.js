import express from "express"
import { crearActividad, modificarActividad, eliminarActividad, obtenerActividadPorSuId, obtenerActividades } from "../controllers/actividad.controller.v1.js";
import { crearActividadValidatorSchemaMiddleware } from "../middlewares/crear.actividad.middleware.js";
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js";



const actividadRouterv1 = express.Router();

//Crear
actividadRouterv1.post("/actividades", soloAdminMiddleware, crearActividadValidatorSchemaMiddleware, crearActividad);
//Obtener
actividadRouterv1.get("/actividades", obtenerActividades)
actividadRouterv1.get("/actividades/:idActividad", obtenerActividadPorSuId)
//Modificar - Modificar Actividad
actividadRouterv1.put("/actividades/:idActividad", soloAdminMiddleware, modificarActividad)
//Borrar - Eliminar Actividad
actividadRouterv1.delete("/actividades/:idActividad", soloAdminMiddleware, eliminarActividad)

export { actividadRouterv1 }
