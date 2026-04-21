import Joi from "joi";

const rutinaValidatorSchema = Joi.object({
    ejercicios: Joi.array().items(Joi.string()).min(1).required().messages({
        "array.base": "Los ejercicios deben ser un arreglo de cadenas",
        "array.min": "Debe haber al menos un ejercicio",}),
    actividad: Joi.string().min(2).max(50).required().messages({
        "string.min": "La actividad debe tener minimo 2 caracteres",
        "string.max": "La actividad debe tener maximo 50 caracteres",
        "any.required": "La actividad es obligatoria",}),
    idUsuario: Joi.string().hex().length().required().messages({
        "string.empty": "El id de la sala es obligatorio",
        "any.required": "El id de la sala es obligatorio",})
})