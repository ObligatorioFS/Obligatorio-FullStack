import { Usuario } from "../modelos/user.model.js";
import { Clase } from "../modelos/clase.model.js";
import { Rutina } from "../modelos/rutina.model.js";
import { PlanPlusClaseError } from "../errors/usuarioErrors/PlanPlusClaseError.js";
import { PlanPlusRutinaError } from "../errors/usuarioErrors/PlanPlusRutinaError.js";

//Validar límite de clases para usuarios con plan plus (máximo 4 clases)
const validarLimiteClasesPlanPlus = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (usuario.plan === "plus") {
        const cantidadClases = await Clase.countDocuments({ inscriptos: idUsuario });

        if (cantidadClases >= 4) {
            throw new PlanPlusClaseError();
        }
    }
};

//Validar límite de rutinas para usuarios con plan plus (máximo 4 rutinas)
const validarLimiteRutinasPlanPlus = async (idUsuario) => {
    const usuario = await Usuario.findById(idUsuario);

    if (usuario.plan === "plus") {
        const cantidadRutinas = await Rutina.countDocuments({ usuario: idUsuario });

        if (cantidadRutinas >= 4) {
            throw new PlanPlusRutinaError();
        }
    }
};

export { validarLimiteClasesPlanPlus, validarLimiteRutinasPlanPlus }
