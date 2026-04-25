import Joi from "joi";

const crearRutinaValidatorSchema = Joi.object({
    idActividad: Joi.string().min(2).max(100).required().messages({
        "string.min": "La actividad debe tener minimo 2 caracteres",
        "string.max": "La actividad debe tener maximo 50 caracteres",
        "any.required": "La actividad es obligatoria"}),
     objetivo: Joi.string().min(2).max(100).required().messages({
        "string.empty": "El objetivo es obligatorio"})
})

export { crearRutinaValidatorSchema }