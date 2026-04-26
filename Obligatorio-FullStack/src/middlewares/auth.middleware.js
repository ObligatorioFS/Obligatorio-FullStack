import jwt from "jsonwebtoken"
import { validarRegistroNuevoUsuario, validarLoginUsuario } from "../validators/auth.validator.v1.js"

const authMiddleware = (req, res, next) => { 
    const token = req.headers.authorization

    if (!token) { 
        res.status(401).json({ message:  "Token no enviado"})
        return;
    }

    //VERIFICAR EL TOKEN JWT ENVIADO
    //VALIDARLO
    try {
        const tokenUsu = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.idUsu = tokenUsu.idUsu;
        req.rolUsu = tokenUsu.rolUsu;
        req.planUsu = tokenUsu.planUsu;
        next()
        console.log("contenido token:", tokenUsu)
    } catch (e) {
        console.log("token invalido")
        res.status(401).json({ message:  "Token invalido"})
    }
}

const soloAdminMiddleware = (req, res, next) => {
    if (req.rolUsu !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. Solo administradores" });
    }

    next();
};

const validarRegistroNuevoUsuarioMiddleware = (req, res, next) =>{
    const { error } = validarRegistroNuevoUsuario.validate(req.body)

     if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    next()
}

const validarLoginUsuarioMiddleware = (req, res, next) =>{
    const { error } = validarLoginUsuario.validate(req.body)

     if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    next()
}


export { authMiddleware, validarRegistroNuevoUsuarioMiddleware, validarLoginUsuarioMiddleware, soloAdminMiddleware}