import jwt from "jsonwebtoken"

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
        req.idUsu = tokenUsu.idUsu
        next()
        console.log("contenido token:", tokenUsu)
    } catch (e) {
        console.log("token invalido")
        res.status(401).json({ message:  "Token invalido"})
    }
}

export { authMiddleware }