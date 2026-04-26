import * as salasService from "../services/sala.service.v1.js"

//Crear Sala Controller
const crearSalaController = async (req, res) => {
    try {
        const nuevaSala = await salasService.crearSalaService(req.body)
        res.status(201).json(nuevaSala);
    } catch (e) {
        res.status(500).json({ message: "error al crear la sala" });
    }
}

//Obtener Salas
const obtenerSalas = async (req, res) => {
    try {
        const notas = await salasService.obtenerTodasLasSalas()
        res.status(200).json(notas)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Obtener Sala por su ID
const obtenerSalaPorSuId = async (req, res) => {
    const idSala = req.params.id
    try {
        const sala = await salasService.obtenerSalaPorSuId(idSala);
        res.status(200).json(sala);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Moodificar Sala
const modificarSala = async (req, res) => {
    const idSala = req.params.id
    const body = req.body

    try {
        const salaModificada = await salasService.modificarSala(idSala, body)
        res.status(200).json(salaModificada);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export { crearSalaController, obtenerSalas, obtenerSalaPorSuId, modificarSala }