import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { usuarioDto } from "../dtos/usuario.dto.js"
import { Usuario } from "../modelos/user.model.js"
import { UsuarioYaExistenteError } from "../errors/usuarioErrors/UsuarioYaExistenteError.js"
import { AuthError } from "../errors/usuarioErrors/AuthError.js"
import { use } from "react"



const doLogin = async ({ email, password }) => {
     console.log(email, password);
    //buscar el usuario por email
    const u = await Usuario.findOne({ email: email })
    if (u) {
        //bcrypt.compare --> true/false
        const esValida = await bcrypt.compare(password, u.password)
        if (esValida) {
            //crar el token jwt
            const token = jwt.sign(
                { idUsu: u.id, rolUsu: u.rol, planUsu: u.plan },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            )
            //return {token: token}
            return { token,
              usuario: usuarioDto(u)  
             }
        }
    }

    throw new AuthError();
}

const registrarUsuario = async ({ nombre, apellido, password, email }) => {
    try {
        if (await Usuario.findOne({ email })) throw new UsuarioYaExistenteError();
        const contraHasheada = await bcrypt.hash(password, 10);

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
        const u = await Usuario.create(nuevoUsuario);
        const token = jwt.sign(
                    { idUsu: u.id, rolUsu: u.rol, planUsu: u.plan },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1h" }
                )
        return { token, usuario: usuarioDto(u) };
    } catch (e) {
        console.log("Error registrando usuario", e);
        throw e;
    }
}
   


export { doLogin, registrarUsuario }

 