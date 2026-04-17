import express from "express"
import { login, registrar } from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/registrar', registrar)

export { authRouter }