import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { usuarioDto } from "../dtos/usuario.dto.js"
import { Usuario } from "../modelos/user.model.js"



const doLogin = async ({ emailU, pass }) => {
     const u = await Usuario.findOne({ email: emailU }) // query de busqueda

    if (u) {
        //bcrypt.compare --> true/false
        const esValida = await bcrypt.compare(pass, u.contrasena)
        if (esValida) {
            //crar el token jwt
            const token = jwt.sign(
                { idUsu: u.id, rolUsu: u.rol, planUsu: u.plan },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            //return {token: token}
            return { token }
        }
    }

    throw new Error("no autorizado");
}

const registrarUsuario = async ({ nombre, apellido, password, email }) => {

    const contraHasheada = await bcrypt.hash(contrasena, 10);

    console.log(contraHasheada);
    const nuevoUsuario = {
        nombre,
        apellido,
        password: contraHasheada,
        email,
        rol: "cliente",
        plan: "plus"
    }
    //usuarios.push(nuevoUsuario);
    const usuarioGuardado = await Usuario.create(nuevoUsuario);
    if (usuarioGuardado) {
    const token = jwt.sign(
                { idUsu: u.id, rolUsu: u.rol, planUsu: u.plan },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
    return token;
    }
        throw new Error("Error al registrar usuario");
}

export { doLogin, registrarUsuario }