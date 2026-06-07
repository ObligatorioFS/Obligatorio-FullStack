import express from "express"
import { obtenerEstadisticasAdmin, obtenerEstadisticasCliente } from "../controllers/estadistica.controller.js"
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js"

const estadisticasRouterV1 = express.Router()

estadisticasRouterV1.get("/estadisticas", soloAdminMiddleware , obtenerEstadisticasAdmin)
estadisticasRouterV1.get("/estadisticas/cliente", obtenerEstadisticasCliente)

export { estadisticasRouterV1 } 