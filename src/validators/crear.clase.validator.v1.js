import Joi from "joi";

const crearClaseValidatorSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required().messages({
            "string.base": "El nombre debe ser texto",
            "string.empty": "El nombre es obligatorio",
            "string.min": "El nombre debe tener al menos 2 caracteres",
            "string.max": "El nombre no puede superar 50 caracteres",
            "any.required": "El nombre es obligatorio"
        }),

    dia: Joi.string().valid("lunes", "martes", "miercoles", "jueves", "viernes", "sabado").required().messages({
            "any.only": "El día debe ser de lunes a sábado",
            "string.empty": "El día es obligatorio",
            "any.required": "El día es obligatorio"
        }),

    hora: Joi.string().pattern(/^([0][7-9]|1[0-9]|2[0-2]):00$/).required().messages({
            "string.pattern.base": "La hora debe estar entre 07:00 y 22:00 en punto",
            "string.empty": "La hora es obligatoria",
            "any.required": "La hora es obligatoria"
        }),

    capacidadMax: Joi.number().integer().min(1).required().messages({
            "number.base": "La capacidad debe ser numérica",
            "number.integer": "La capacidad debe ser un número entero",
            "number.min": "La capacidad mínima es 1",
            "any.required": "La capacidad es obligatoria"
        }),

    idSala: Joi.string().required().messages({
            "string.empty": "El id de la sala es obligatorio",
            "any.required": "El id de la sala es obligatorio"
        })
});

export { crearClaseValidatorSchema };
