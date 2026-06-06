import express from "express"
import { obtenerEstadisticasAdmin } from "../controllers/estadistica.controller.js"
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js"

const estadisticasRouterV1 = express.Router()

estadisticasRouterV1.get("/estadisticas", soloAdminMiddleware , obtenerEstadisticasAdmin)

export { estadisticasRouterV1 } 