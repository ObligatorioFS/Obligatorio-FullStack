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
//Obtener Rutinas pendientes
const obtenerRutinasPendientes = async (req, res) => {
    try {
        const notas = await rutinaService.obtenerTodasLasRutinasPendientes()
        res.status(200).json(notas)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Obtener Rutinas por UsuarioId a
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

//Agregar ejercicios a la rutina
const agregarEjerciciosARutina = async (req, res) => {
    const idRutina = req.params.id;
    const ejercicios = req.body.ejercicios;
        try {        
        const rutinaConEjercicios = await rutinaService.agregarEjerciciosARutina(idRutina, ejercicios);
        res.status(200).json(rutinaConEjercicios);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { crearRutinaController, obtenerRutinasPendientes, obtenerRutinaPorSuId, obtenerRutinasPorUsuario, agregarEjerciciosARutina }