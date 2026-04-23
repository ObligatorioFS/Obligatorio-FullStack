import { GoogleGenerativeAI } from "@google/generative-ai";
import { Rutina } from "../modelos/rutina.model.js";
import { validarLimiteRutinasPlanPlus } from "./validations.service.v1.js";

//Crear Rutina
const crearRutinaService = async ({ actividad, objetivo }, idUsuario) => {
    // Validar límite de rutinas para usuarios con plan plus
    await validarLimiteRutinasPlanPlus(idUsuario);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction:
            "Eres un profesional en diseño de rutinas de ejercicio. Devuelve únicamente una lista de ejercicios separados por comas, sin explicaciones ni numeración."
    });
    try {
        const prompt = `Genera ejercicios para la actividad: "${actividad}" con el objetivo: "${objetivo}", con repeticiones y series adecuadas, ejemplo "3x15 sentadillas, 3x10 flexiones"`;
        const result = await model.generateContent(prompt);
        const ejerciciosTexto = result.response.text().trim();
    
        // Convierte la lista de ejercicios en array
        const ejercicios = ejerciciosTexto.split(",");

        const nuevaRutina = {
            ejercicios,
            actividad,
            objetivo,
            idUsuario
        };
        const rutinaGuardada = await Rutina.create(nuevaRutina);
        return rutinaGuardada;
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
