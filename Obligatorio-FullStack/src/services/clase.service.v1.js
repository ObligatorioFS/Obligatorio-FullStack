import { ActividadNoEncontradaError } from "../errors/actividadErrors/ActividadNoEncontradaError.js";
import { CapacidadSuperadaError } from "../errors/claseErrors/CapacidadSuperadaError.js";
import { ClaseNoEncontrada } from "../errors/claseErrors/ClaseNoEncontradaError.js";
import { ClaseYaExisteError } from "../errors/claseErrors/ClaseYaExisteError.js";
import { CuposLlenosError } from "../errors/claseErrors/CuposLlenosError.js";
import { DescripcionVaciaError } from "../errors/claseErrors/DescripcionVaciaError.js";
import { SalaNoEncontrada } from "../errors/salaErrors/SalaNoEncontradaError.js";
import { UsuarioNoEncontradoError } from "../errors/usuarioErrors/UsuarioNoEncontrado.js";
import { YaInscriptoError } from "../errors/usuarioErrors/UsuarioYaInscriptoError.js";
import { Actividad } from "../modelos/actividad.model.js";
import { Clase } from "../modelos/clase.model.js";
import { Sala } from "../modelos/sala.model.js";
import { Usuario } from "../modelos/user.model.js";
import { validarLimiteClasesPlanPlus } from "./validations.service.v1.js";
import  'dotenv/config' ; 
import cloudinary from "cloudinary";
import { BrevoClient } from "@getbrevo/brevo";

//Crear Clase
const crearClase = async ({descripcion, dia, hora, capacidadMax, sala, actividad}) => {
    
    await validarDatosCrearClase({ descripcion, dia, hora, capacidadMax, sala, actividad});

    const nuevaClase ={
        descripcion,
        dia,
        hora,
        capacidadMax,
        actividad,
        sala
    }
 const claseGuardada = await Clase.create(nuevaClase)

  const clasePopulada = await Clase.findById(claseGuardada._id)
    .populate("actividad", "nombre descripcion -_id")
    .populate("sala", "nombre -_id")
    .populate("inscriptos", "nombre email -_id")

  return clasePopulada
}

//Obtener Clases
const obtenerTodasLasClases = async (page, limit, dia, idActividad) => {
    const query = {};
    if(dia) {
        query.dia = dia
    }
    
    if(idActividad) {
        query.actividad = idActividad
    }

    const total = await Clase.countDocuments(query)
    page = Number(page)
    limit = Number(limit)
    const skip = (page - 1) * limit //0
    //total: 10 
    //vamos de a 5
    try {
        const clases = await Clase.find(query).populate("actividad", "nombre descripcion -_id").populate("sala", "nombre -_id").populate("inscriptos", "nombre email _id")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        return { clases, limit, total, totalPaginas: Math.ceil(total/limit) }
    } catch (e) {
        console.log("error al obtener clases", e)
        throw new Error("error obteniendo las clases")
    }
}


//Obtener Clase por ID
const obtenerClasePorSuId = async (idClase) => {
    try {
        const clase = await Clase.findOne({ _id: idClase}).populate("actividad", "nombre descripcion -_id").populate("sala", "nombre -_id").populate("inscriptos", "nombre email _id");
        if (clase) {
            return clase
        }
        throw new ClaseNoEncontrada();
    } catch (e) {
        throw e;
    }
}

//Obtener Clases por UsuarioId
const obtenerClasesDelUsuario = async idUsuario => {
    try {
        return await Clase.find({ inscriptos: idUsuario }).populate("actividad", "nombre descripcion -_id").populate("sala", "nombre -_id")
    } catch (e) {
        throw new Error("Error obteniendo las clases del usuario")
    }
}

//Inscribir Usuario a Clase
const inscribirUsuario = async (idClase, idUsuario) => {

    //Destructuracion de objeto
    const { clase } = await validarInscripcion(idClase, idUsuario)
    console.log(clase)  //importa ue se llame igual que el modelo, sino no funciona la destructuracion
    //Pushear el Usuario a la Clase
    clase.inscriptos.push(idUsuario)
    await clase.save();
    return clase;
}

//Remover Inscripcion
const removerUsuarioDeInscriptos = async (idClase, idUsuario) => {
    const { clase } = await validarRemoverInscripcion(idClase, idUsuario);
    //Como no trabajamo con una entidad Inscripcion, para utilizar findOneAndDelete() debemos usar $pull
     clase.inscriptos = clase.inscriptos.filter(
        inscripto => inscripto.toString() !== idUsuario
    );
    await clase.save();
    return clase;
}

//Validacion para Inscripcion
const validarInscripcion = async (idClase, idUsuario) => {

    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
        throw new UsuarioNoEncontradoError();
    }

    const clase = await Clase.findById(idClase);
    if (!clase) {
        throw new ClaseNoEncontrada();
    }

    const yaInscripto = clase.inscriptos.some(
        inscripto => inscripto.toString() === idUsuario
    );
    if (yaInscripto) {
        throw new YaInscriptoError();
    }

    if (clase.inscriptos.length >= clase.capacidadMax) {
        throw new CuposLlenosError();
    }

    // Validar límite de clases para usuarios con plan plus
    await validarLimiteClasesPlanPlus(idUsuario);
    
    return { usuario, clase };
}

//Validacion Crear Clase
const validarDatosCrearClase = async ({descripcion, dia, hora, capacidadMax, sala, actividad }) => {
   //Validar que la descripcion ne sea vacia o nula
    if (!descripcion || descripcion.trim() === "") {
        throw new DescripcionVaciaError();
    }
   //Busco Actividad - Si no existe, Error.
   const actividadEncontrada = await Actividad.findById(actividad);
    if (!actividadEncontrada) {
        throw new ActividadNoEncontradaError();
    }
    //Busco Sala - Si no existe o la capacidad es menor, Error.
   const salaEncontrada = await Sala.findById(sala);
   if(!salaEncontrada){
       throw new SalaNoEncontrada();
   }
   if(capacidadMax > salaEncontrada.capacidadMax){
       throw new CapacidadSuperadaError();
   }
    //Busco si ya existe una clase en esa Sala, Dia y Hora
    const existeClase = await Clase.findOne({ dia, hora, sala});
    if (existeClase) {
    throw new ClaseYaExisteError();
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Agregar Imagen a Clase
const agregarImagen = async (idClase, img) => {
    const clase = await Clase.findById(idClase);
    if (!clase) {
        throw new ClaseNoEncontrada();
    }
    // Subir imagen a Cloudinary
    const imgBase64 = Buffer.from(img.buffer).toString('base64');
    const uri = `data:${img.mimetype};base64,${imgBase64}`;
    let result;
    try {
        result = await cloudinary.uploader.upload(uri);
    } catch (e) {
        throw e
    }

    clase.imagenURL = result.secure_url
    return await clase.save()
}

//Validacion para RemoverInscripcion
const validarRemoverInscripcion = async (idClase, idUsuario) => {

    const clase = await Clase.findById(idClase);
    if (!clase) {
        throw new ClaseNoEncontrada();
    }

    const yaInscripto = clase.inscriptos.some(
        inscripto => inscripto.toString() === idUsuario
    );
    if (!yaInscripto) {
        throw new Error("El Usuario no esta inscripto");
    }
    
    return { clase };
}

//Limpiar Inscriptos de las Clases de un dia
const limpiarUsuarioDeClasesPorDia = async (body) => {
    try {
    const dia = body.dia;
    const clases = await Clase.find({ dia });
    //recorrerlas y limpiar inscriptos
    for (const clase of clases) {
        clase.inscriptos = []; 
        await clase.save();
    }
    return { clases };
    } catch (e) {
        throw e;
    }
}

// Eliminar Clase
const eliminarClase = async (idClase) => {
    try {
        const clase = await Clase.findById(idClase);
        if (!clase) throw new ClaseNoEncontrada();
        if(clase.inscriptos.length > 0) throw new Error("No se puede eliminar una clase con inscriptos")
        await Clase.findByIdAndDelete(idClase);
    } catch (e) {
        throw e;
    }
}
const getBrevoClient = () => new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const enviarEmailBrevo = async (idUsuario, idClase) => {
    try {
        const clase = await Clase.findById(idClase).populate("actividad");
        const usuario = await Usuario.findById(idUsuario);
        console.log(usuario);
        
        if (!usuario){
             throw new UsuarioNoEncontradoError();
        }
        if (!clase){
            throw new ClaseNoEncontrada();
        }
        if (!clase.actividad){
            throw new ActividadNoEncontradaError();
        } 
        
        const client = getBrevoClient();
        const senderEmail = "felirossini88@gmail.com";
        const senderName = "Club";

        return client.transactionalEmails.sendTransacEmail({
      subject: "Inscripción confirmada",
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [
        {
          email: usuario.email,
          name: usuario.nombre,
        },
      ],
      htmlContent: `
        <html>
          <body>
            <p>Hola ${usuario.nombre},</p>
            <p>¡Gracias por inscribirte a la clase de <strong>${clase.actividad.nombre}</strong>!</p>
            <p>Tu clase está programada para el día: <strong>${clase.dia}</strong>.</p>
            <p>¡Te esperamos en el club!</p>
          </body>
        </html>
      `,
      textContent:  `Hola ${usuario.nombre},
                    Gracias por inscribirte a la clase de ${clase.actividad.nombre}.
                    Tu clase es el día: ${clase.dia}.
                    ¡Te esperamos!`});
      } catch (e) {
          throw e;
      }
};

export { crearClase, obtenerTodasLasClases, obtenerClasePorSuId, obtenerClasesDelUsuario, inscribirUsuario, removerUsuarioDeInscriptos, enviarEmailBrevo, limpiarUsuarioDeClasesPorDia, agregarImagen, eliminarClase}
