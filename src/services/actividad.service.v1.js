import { Actividad } from "../modelos/actividad.model";
import { Actividad } from "../errors/salaErrors/SalaNoEncontradaError.js";



//Crear Sala
const crearSalaService = async ({ nombre, capacidadMax }) => {
    const nuevaSala = {
        nombre,
        capacidadMax
    }
    const salaGuardada = await Sala.create(nuevaSala)
    return salaGuardada;
}

//Obtener Salas
const obtenerTodasLasSalas = async () => {
    try {
        return await Sala.find({});
    } catch (e) {
        console.log("Error al obtener salas", e);
        throw new Error("Error obteniendo las salas");
    }
}

//Obtener Sala por ID
const obtenerSalaPorSuId = async (idSala) => {
    try {
        const sala = await Sala.findOne({ _id: idSala})
        if (sala) {
            return sala
        }
        throw new SalaNoEncontrada();
    } catch (e) {
        throw e;
    }
}

//Modificar Sala
const modificarSala = async (idSala, body) => {
    const salaModificada = await Sala.findOneAndUpdate(
        { _id: idSala},
        body,
        { returnDocument: "after", runValidators: true }
    )

    if (salaModificada) {
        return salaModificada;
    }

    throw new SalaNoEncontrada();
}


export { crearSalaService, obtenerTodasLasSalas, obtenerSalaPorSuId, modificarSala }