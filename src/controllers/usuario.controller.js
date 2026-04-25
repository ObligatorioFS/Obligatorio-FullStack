import * as usuarioService from "../services/usuario.service.v1.js"

//Modificar Plan de Usuario
const modificarPlanUsuario = async (req, res) => {
    const idUsuario = req.idUsu;
    try {
        const usuarioModificado = await usuarioService.modificarPlanUsuario(idUsuario)
        res.status(200).json(usuarioModificado);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { modificarPlanUsuario }