import { GoogleGenerativeAI } from "@google/generative-ai";
import * as rutinaService from "../services/rutina.service.v1.js"

//Crear Rutina
const crearRutinaController = async (req, res) => {
    try {
        const nuevaRutina = await rutinaService.crearRutinaService(req.body, req.idUsu);
        res.status(201).json(nuevaRutina);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
}
//Obtener Rutinas
const obtenerRutinas = async (req, res) => {
    try {
        const notas = await rutinaService.obtenerTodasLasRutinas()
        res.status(200).json(notas)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Obtener Rutinas por UsuarioId
const obtenerRutinasPorUsuario = async (req, res) => {
    const idUsuario = req.idUsu;
    try {
        const rutinas = await rutinaService.obtenerRutinasPorUsuario(idUsuario)
        res.status(200).json(rutinas)
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
        res.status(e.code || 500).json({ message: e.message })
    }
}



export { crearRutinaController, obtenerRutinas, obtenerRutinaPorSuId, obtenerRutinasPorUsuario }