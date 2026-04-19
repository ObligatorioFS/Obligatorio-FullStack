import { Sala } from "../modelos/sala.model.js";

//Crear Sala
const crearSalaService = async ({ nombre, capacidadMax }) => {
    const nuevaSala = {
        nombre,
        capacidadMax
    }
    const salaGuardada = await Sala.create(nuevaSala)
    return salaGuardada;
}

export { crearSalaService }