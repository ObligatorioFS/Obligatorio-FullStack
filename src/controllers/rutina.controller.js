import { GoogleGenerativeAI } from "@google/generative-ai";
import * as rutinaService from "../services/rutina.service.v1.js"

//Crear Rutina
const crearRutinaController = async (req, res) => {
    const idUsuario = req.idUsu;
    const actividad = req.params.actividad;
    const objetivo = req.params.objetivo;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        // Instrucción de sistema para definir el comportamiento "editor"
        systemInstruction: "Eres un profesional en el diseño de rutinas de ejercicio. Tu objetivo es crear rutinas personalizadas según la actividad y objetivos del usuario. No añadas explicaciones, solo devuelve la rutina diseñada con sus series y repeticiones.",
        requestOptions: {
            timeout: 10, // 5 segundos de tiempo máximo de espera
        }
    });

    try {
        const prompt = `Crea una rutina de ejercicio para ${actividad} con el objetivo de ${objetivo}`;
        const result = await model.generateContent(prompt);
        const RUTINA = result.response.text().trim();
        res.status(200).json({ rutina: RUTINA });
    } catch (e) {
        console.log("error con gemini", e)
        res.status(500).json({ message: "Error al crear la rutina con IA" })
    }
}
//Obtener Rutinas
const obtenerRutinas = async (req, res) => {
    try {
        const notas = await rutinaService.obtenerTodasLasRutinas()
        res.status(200).json(notas)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Obtener Rutina por su ID
const obtenerRutinaPorSuId = async (req, res) => {
    const idRutina = req.params.id
    try {
        const rutina = await rutinaService.obtenerRutinaPorSuId(idRutina);
        res.status(200).json(rutina);
    } catch (e) {
        console.log(e)
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { crearRutinaController, obtenerRutinas, obtenerRutinaPorSuId }