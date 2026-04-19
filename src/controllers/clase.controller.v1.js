import * as claseService from "../services/clase.service.v1.js"

//Crear Clase
const crearClase = async (req, res) => {
    try {
        const nuevaClase = await claseService.crearClase(req.body)
        res.status(201).json(nuevaClase);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Obtener todas las clases
const obtenerClases = async (req, res) => {
    try {
        const clases = await claseService.obtenerTodasLasClases()
        res.status(200).json(clases)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Obtener Clase por su ID
const obtenerClasePorSuId = async (req, res) => {
    const idClase = req.params.id
    try {
        const clase = await claseService.obtenerClasePorSuId(idClase);
        res.status(200).json(clase);
    } catch (e) {
        console.log(e)
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Obtener Clases por UsuarioId
const obtenerClasesDelUsuario = async (req, res) => {
    const idUsuario = req.idUsu;
    try {
        const clases = await claseService.obtenerClasesDelUsuario(idUsuario)
        res.status(200).json(clases)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const inscribirUsuario = async (req, res) => {
    const idClase = req.params.idClase
    const idUsuario = req.idUsu;
    try {
        const claseConInscripcion = await claseService.inscribirUsuario(idClase, idUsuario)
        res.status(200).json(claseConInscripcion);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Remover Usuario de Inscripto
const removerUsuarioDeInscriptos = async (req, res) => {
    const idClase = req.params.idClase
    const idUsuario = req.idUsu;
    try {
        const clase = await claseService.removerUsuarioDeInscriptos(idClase, idUsuario)
        res.status(200).json(clase)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export { crearClase, obtenerClases, obtenerClasePorSuId, obtenerClasesDelUsuario, inscribirUsuario, removerUsuarioDeInscriptos }