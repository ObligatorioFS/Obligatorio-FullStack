import { GoogleGenerativeAI } from "@google/generative-ai";
import { Rutina } from "../modelos/rutina.model.js";
import { validarLimiteRutinasPlanPlus } from "./validations.service.v1.js";
import { Actividad } from "../modelos/actividad.model.js";
import { Usuario } from "../modelos/user.model.js";
import { ActividadNoEncontradaError } from "../errors/actividadErrors/ActividadNoEncontradaError.js";
import { UsuarioNoEncontradoError } from "../errors/usuarioErrors/UsuarioNoEncontrado.js";
import { RutinaNoEncontrada } from "../errors/rutinaErrors/RutinaNoEncontradaError.js";


//Crear Rutina
const crearRutinaService = async ({ actividad, objetivo }, idUsuario) => {
    // Validar límite de rutinas para usuarios con plan plus
    const usuario = await Usuario.findById(idUsuario);
    if (!usuario) {
        throw new UsuarioNoEncontradoError();
    }
    await validarLimiteRutinasPlanPlus(idUsuario);
    // Verificar que la actividad exista
    const a = await Actividad.findById(actividad);
    if (!a) {
        throw new ActividadNoEncontradaError();
    }
    let ejercicios = [];
    try {
    ejercicios = await generarRutinaConIA(actividad, objetivo);
    } catch (e) {
     ejercicios = ["El Administrador tiene que generar esta rutina manualmente"];
    }

    const nuevaRutina = {
    ejercicios,
    actividad,
    objetivo,
    usuario: idUsuario
    };
    
    const rutinaGuardada = await Rutina.create(nuevaRutina);
    return rutinaGuardada.populate("actividad", "nombre descripcion -_id");
}

// Función para generar ejercicios utilizando IA
const generarRutinaConIA = async (actividad, objetivo) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const a = await Actividad.findById(actividad);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction:
            "Eres un profesional en diseño de rutinas de ejercicio. Devuelve únicamente una lista de ejercicios separados por comas, sin explicaciones ni numeración."
    });
    try {
        const prompt = `Genera ejercicios para la actividad: "${a.nombre}" con el objetivo: "${objetivo}". Ademas quiero que le agregues a cada ejercicio sus devidas repeticiones y series adecuadas, ejemplo "3x15 sentadillas, 3x10 flexiones"`;
        const result = await model.generateContent(prompt);
        const ejerciciosTexto = result.response.text().trim();
    
        // Convierte la lista de ejercicios en array
        const ejercicios = ejerciciosTexto.split(",");

        return ejercicios;
    } catch (e) {
        throw e;
    }
}

// Obtener Rutinas por Usuario
const obtenerRutinasPorUsuario = async (idUsuario) => {
    try {
        const usuario = await Usuario.findById(idUsuario)
        if (!usuario) {
            throw new UsuarioNoEncontradoError();
        }
        return await Rutina.find({ usuario: idUsuario }).populate("actividad", "nombre descripcion -_id").populate("usuario", "email -_id")
    } catch (e) {
        throw e;
    }
}

//Obtener Rutinas pendientes
const obtenerTodasLasRutinasPendientes = async () => {
    try {
        return await Rutina.find({
            $or: [
                { ejercicios: { $exists: false } },
                { ejercicios: { $size: 0 } }
            ]
        })
            .populate("actividad", "nombre descripcion -_id")
            .populate("usuario", "email")
    } catch (e) {
        throw new Error("Error obteniendo las rutinas");
    }
}

//Obtener Rutina por ID
const obtenerRutinaPorSuId = async (idRutina) => {
    try {
        const rutina = await Rutina.findOne({ _id: idRutina }).populate("actividad", "nombre descripcion -_id").populate("usuario", "email")
        if (rutina) {
            return rutina
        }
        throw new RutinaNoEncontrada();
    } catch (e) {
        throw e;
    }
}


//Agregar ejercicios a la rutina
const agregarEjerciciosARutina = async (idRutina, ejercicios) => {
    try{
    const rutina = await Rutina.findOne({ _id: idRutina })
    if(!rutina) throw new RutinaNoEncontrada();
    rutina.ejercicios = ejercicios;
    await rutina.save();
    return rutina;
    }catch(e){
       e;
    }
}


export { crearRutinaService, obtenerTodasLasRutinasPendientes, obtenerRutinaPorSuId, obtenerRutinasPorUsuario, agregarEjerciciosARutina }
