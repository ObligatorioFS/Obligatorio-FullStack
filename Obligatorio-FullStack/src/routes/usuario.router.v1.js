import express from "express"
import { modificarPlanUsuario } from "../controllers/usuario.controller.js";


const usuarioRouterV1 = express.Router();

usuarioRouterV1.put("/usuario", modificarPlanUsuario);


export { usuarioRouterV1 }