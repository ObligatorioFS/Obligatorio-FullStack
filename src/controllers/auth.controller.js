//controlador de inicio de sesion

import { doLogin, registrarUsuario } from "../services/auth.service.v1.js";

const login = async (req, res) => {

    try {
        const token = await doLogin(req.body)
        res.status(200).json(token)
    } catch (e) { 
        res.status(401).json({ message: e.message})
    }

}

const registrar = async (req, res) => {
    try {
        console.log("registrando usuario...")
        const token = await registrarUsuario(req.body)
        res.status(201).json(token)
    } catch (e) { 
        res.status(401).json({ message: e.message})
    }
}

export { login, registrar }