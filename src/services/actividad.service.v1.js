import { ActividadEnUsoError } from "../errors/actividadErrors/ActividadEnUsoError.js";
import { ActividadNoEncontradaError } from "../errors/actividadErrors/ActividadNoEncontradaError.js";
import { ActividadYaExisteError } from "../errors/actividadErrors/ActividadYaExisteError.js";
import { Actividad } from "../modelos/actividad.model.js";
import { Clase } from "../modelos/clase.model.js";
import { Rutina } from "../modelos/rutina.model.js";


//Crear Actividad
const crearActividad = async ({ nombre, descripcion }) => {
    try {
    if (await Actividad.findOne({ nombre })) throw new ActividadYaExisteError();

    const nuevaActividad = {
        nombre,
        descripcion,
    }
    const actividadGuardada = await Actividad.create(nuevaActividad)
    return actividadGuardada;
    }catch(e){
        throw e;
    }
    
}

//Obtener Todas las Actividades
const obtenerTodasLasActividades = async () => {
    try {
        const actividades = await Actividad.find();
        return actividades;
    } catch (e) {
        throw e;
    }
};

//Obtener Actividad por ID
const obtenerActividadPorId = async (idActividad) => {
    try {
        const actividad = await Actividad.findById(idActividad);
        if (actividad){
            return actividad;
        }
        throw new ActividadNoEncontradaError();
    } catch (e) {
        throw e;
    }
};

//Modificar Actividad
const modificarActividad = async (idActividad, body) => {
   try{
      const actividadModificada = await Actividad.findOneAndUpdate(
        { _id: idActividad},
        body,
        { returnDocument: "after", runValidators: true }
    )

    if (actividadModificada) {
        return actividadModificada;
    }
       throw new ActividadNoEncontradaError();
   }catch(e){
    throw e;
   }
};

//Eliminar Actividad
const eliminarActividad = async (id) => {
    try {
        const enClase = await Clase.findOne({ actividad: id });
        const enRutina = await Rutina.findOne({ actividad: id });
        if (enClase || enRutina) throw new ActividadEnUsoError();

        const actividadEliminada = await Actividad.findByIdAndDelete(id);
        if (actividadEliminada){
           return actividadEliminada;
        }
         throw new ActividadNoEncontradaError();
    } catch (e) {
        throw e;
    }
};

export { crearActividad, modificarActividad, eliminarActividad, obtenerTodasLasActividades, obtenerActividadPorId}
