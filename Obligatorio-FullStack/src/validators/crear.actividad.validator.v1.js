import Joi from "joi";

const actividadValidatorSchema = Joi.object({
    nombre: Joi.string().trim().lowercase().required().messages({
        "string.base": "El nombre debe ser texto",
        "string.empty": "El nombre es obligatorio",
        "any.required": "El nombre es obligatorio"
    }),
    descripcion: Joi.string().trim().required().messages({
        "string.base": "La descripción debe ser texto",
        "string.empty": "La descripción es obligatoria",
        "any.required": "La descripción es obligatoria"
    }),
});

export { actividadValidatorSchema };
