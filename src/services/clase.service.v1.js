import { CapacidadSuperadaError } from "../errors/claseErrors/CapacidadSuperadaError.js";
import { ClaseNoEncontrada } from "../errors/claseErrors/ClaseNoEncontradaError.js";
import { ClaseYaExisteError } from "../errors/claseErrors/ClaseYaExisteError.js";
import { CuposLlenosError } from "../errors/claseErrors/CuposLlenosError.js";
import { SalaNoEncontrada } from "../errors/salaErrors/SalaNoEncontradaError.js";
import { UsuarioNoEncontrado } from "../errors/usuarioErrors/UsuarioNoEncontrado.js";
import { YaInscriptoError } from "../errors/usuarioErrors/UsuarioYaInscriptoError.js";
import { Clase } from "../modelos/clase.model.js";
import { Sala } from "../modelos/sala.model.js";
import { Usuario } from "../modelos/user.model.js";
import { validarLimiteClasesPlanPlus } from "./validations.service.v1.js";


//Crear Clase
const crearClase = async ({nombre, dia, hora, capacidadMax, idSala}) => {
   
    await validarDatosCrearClase({ dia, hora, capacidadMax, idSala });

    const nuevaClase ={
        nombre,
        dia,
        hora,
        capacidadMax,
        idSala
    }
    const claseGuardada = await Clase.create(nuevaClase)
    return claseGuardada;
}

//Obtener Clases
const obtenerTodasLasClases = async () => {
    try {
        return await Clase.find({});
    } catch (e) {
        console.log("Error al obtener salas", e);
        throw new Error("Error obteniendo las salas");
    }
}

//Obtener Clase por ID
const obtenerClasePorSuId = async (idClase) => {
    try {
        const clase = await Clase.findOne({ _id: idClase})
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
        return await Clase.find({ inscriptos: idUsuario })
    } catch (e) {
        console.log("Error al obtener las clases del Usuario", e)
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
        throw new UsuarioNoEncontrado();
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
const validarDatosCrearClase = async ({ dia, hora, capacidadMax, idSala }) => {
   
    //Busco Sala - Si no existe o la capacidad es menor, Error.
   const sala = await Sala.findById(idSala);
   if(!sala){
       throw new SalaNoEncontrada();
   }
   if(capacidadMax > sala.capacidadMax){
       throw new CapacidadSuperadaError();
   }
    //Busco si ya existe una clase en esa Sala, Dia y Hora
    const existeClase = await Clase.findOne({ dia, hora, idSala});
    if (existeClase) {
    throw new ClaseYaExisteError();
    }
};

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

export { crearClase, obtenerTodasLasClases, obtenerClasePorSuId, obtenerClasesDelUsuario, inscribirUsuario, removerUsuarioDeInscriptos}