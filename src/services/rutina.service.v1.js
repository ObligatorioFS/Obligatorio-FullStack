import { Rutina } from "../modelos/rutina.model.js";

//Crear Rutina
const crearRutinaService = async ({ ejercicios, actividad, idUsuario, objetivo }) => {
    const nuevaRutina = {
        ejercicios,
        actividad,
        idUsuario,
        objetivo,
    }
    const rutinaGuardada = await Rutina.create(nuevaRutina)
    return rutinaGuardada;
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
