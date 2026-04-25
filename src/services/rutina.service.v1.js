import { GoogleGenerativeAI } from "@google/generative-ai";
import { Rutina } from "../modelos/rutina.model.js";
import { validarLimiteRutinasPlanPlus } from "./validations.service.v1.js";
import { Actividad } from "../modelos/actividad.model.js";
import { ActividadNoEncontradaError } from "../errors/actividadErrors/ActividadNoEncontradaError.js";
import { UsuarioNoEncontradoError } from "../errors/usuarioErrors/UsuarioNoEncontrado.js";


//Crear Rutina
const crearRutinaService = async ({ idActividad, objetivo }, idUsuario) => {
    // Validar límite de rutinas para usuarios con plan plus
    await validarLimiteRutinasPlanPlus(idUsuario);
    // Verificar que la actividad exista
    const a = Actividad.findById(idActividad);
    if (!a) {
        throw new ActividadNoEncontradaError();
    }
    let ejercicios = [];
    // Generar ejercicios utilizando IA
    ejercicios = await generarRutinaConIA(idActividad, objetivo);

    const nuevaRutina = {
            ejercicios,
            idActividad,
            objetivo,
            idUsuario
        };
        const rutinaGuardada = await Rutina.create(nuevaRutina);
        if(!rutinaGuardada.ejercicios || rutinaGuardada.ejercicios.length === 0) {
            throw new Error("El Administrador tiene que generar esta rutina manualmente");
        }
        return rutinaGuardada.populate("idActividad", "nombre descripcion -_id");
}

// Función para generar ejercicios utilizando IA
const generarRutinaConIA = async (idActividad, objetivo) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const a = await Actividad.findById(idActividad);
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
        return await Rutina.find({ idUsuario }).populate("idActividad", "nombre descripcion -_id");
    } catch (e) {
        throw e;
    }
}

//Obtener Rutinas
const obtenerTodasLasRutinas = async () => {
    try {
        return await Rutina.find({});
    } catch (e) {
        console.log("Error al obtener las rutinas", e);
        throw new Error("Error obteniendo las rutinas");
    }
}

//Obtener Rutina por ID
const obtenerRutinaPorSuId = async (idRutina) => {
    try {
        const rutina = await Rutina.findOne({ _id: idRutina })
        if (rutina) {
            return rutina
        }
        throw new RutinaNoEncontrada();
    } catch (e) {
        throw e;
    }
}

export { crearRutinaService, obtenerTodasLasRutinas, obtenerRutinaPorSuId }
