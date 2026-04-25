import * as actividadService from "../services/actividad.service.v1.js"

//Crear Actividad
const crearActividad = async (req, res) => {
    try {
        const nuevaActividad = await actividadService.crearActividad(req.body)
        res.status(201).json(nuevaActividad);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
}

//Obtener Todas las Actividades
const obtenerActividades = async (req, res) => {
    try {
        const actividades = await actividadService.obtenerTodasLasActividades();
        res.status(200).json(actividades)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Obtener Actividad por ID
const obtenerActividadPorSuId = async (req, res) => {
    const idActividad = req.params.id
    try {
        const actividad = await actividadService.obtenerActividadPorId(idActividad);
        res.status(200).json(actividad);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Modificar Actividad
const modificarActividad = async (req, res) => {
    const idActividad = req.params.id
    const body = req.body

    try {
        const actividadModificada = await actividadService.modificarActividad(idActividad, body)
        res.status(200).json(actividadModificada);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Eliminar Actividad
const elminarActividad = async (req, res) => {
    const idActividad = req.params.id
    try {
        await actividadService.eliminarActividad(idActividad);
        res.status(204).send();
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}


export { crearActividad, modificarActividad, elminarActividad, obtenerActividadPorSuId, obtenerActividades }

