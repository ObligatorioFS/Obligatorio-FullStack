import express from "express"
import { login, registrar } from "../controllers/auth.controller.js";
import { validarRegistroNuevoUsuarioMiddleware, validarLoginUsuarioMiddleware } from "../middlewares/auth.middleware.js";


const authRouter = express.Router();

authRouter.post('/login', validarLoginUsuarioMiddleware, login)
authRouter.post('/registrar', validarRegistroNuevoUsuarioMiddleware, registrar)

export { authRouter }