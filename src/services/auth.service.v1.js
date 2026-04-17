import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { usuarioDto } from "../dtos/usuario.dto.js"
import { Usuario } from "../modelos/user.model.js"



const doLogin = async ({ email, password }) => {
     const u = await Usuario.findOne({ email: email }) // query de busqueda
     console.log(email, password);
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
            return { token }
        }
    }

    throw new Error("no autorizado");
}

const registrarUsuario = async ({ nombre, apellido, password, email }) => {

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
    return { token };

    //const usuarioDTO = usuarioDto(usuarioGuardado)
    
    //jwt.sign
    //nuevoUsuario.token = 
    //return usuarioDTO;
}
   


export { doLogin, registrarUsuario }

 