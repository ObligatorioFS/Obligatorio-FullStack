import * as estadisticasService from "../services/estadistica.services.js"

const obtenerEstadisticasAdmin = async (req, res) => {
  try {
    const estadisticas = await estadisticasService.obtenerEstadisticasAdmin()
    res.status(200).json(estadisticas)
  } catch (e) {
    res.status(e.code || 500).json({ message: e.message })
  }
}

// Obtener estadisticas cliente
const obtenerEstadisticasCliente = async (req, res) => {
    const idUsuario = req.idUsu

    try {
        const estadisticas = await estadisticasService.obtenerEstadisticasCliente(idUsuario)
        res.status(200).json(estadisticas)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

export  { obtenerEstadisticasAdmin, obtenerEstadisticasCliente }