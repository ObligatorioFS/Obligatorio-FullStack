import jwt from "jsonwebtoken"
import { usuarioDto } from "../dtos/usuario.dto.js"
import { Usuario } from "../modelos/user.model.js"
import { UsuarioNoEncontrado } from "../errors/usuarioErrors/UsuarioNoEncontrado.js"

const modificarPlanUsuario = async (idUsuario) => {
    try {
        const usuario = await Usuario.findById(idUsuario)
        if (!usuario) {
            throw new UsuarioNoEncontrado();
        }
        if (usuario.plan === "plus") {
            usuario.plan = "premium"
            await usuario.save()
            return await generarToken(usuario);
        }
        else{
            throw new Error("El usuario ya tiene el plan premium");
        }
    }catch (e) {
        throw e;
    }
}

const generarToken = async (usuario) => {
    const u = usuario;
    const token = jwt.sign(
            { idUsu: u.id, rolUsu: u.rol, planUsu: u.plan },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        )
    return { token };
}

export { modificarPlanUsuario }


/*const salaModificada = await Sala.findOneAndUpdate(
        { _id: idSala},
        body,
        { returnDocument: "after", runValidators: true }
    )

    if (salaModificada) {
        return salaModificada;
    }

    throw new SalaNoEncontrada();*/