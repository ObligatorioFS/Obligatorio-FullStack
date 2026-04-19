import Joi from "joi";

const crearSalaValidatorSchema = Joi.object({
    nombre: Joi.string().min(5).max(20).required().messages({
              "string.min": "El nombre debe tener minimo 5 caracteres",
              "string.max": "El nombre debe tener maximo 20 caracteres",
              "any.required": "El nombre es mandatorio"
    }),
    capacidadMax: Joi.number().integer().min(1).max(100).required().messages({
                  "number.base": "La capacidad máxima debe ser un número",
                  "number.integer": "La capacidad máxima debe ser un número entero",
                  "number.min": "La capacidad máxima debe ser mínimo 1",
                  "number.max": "La capacidad máxima debe ser máximo 100",
                  "any.required": "La capacidad máxima es obligatoria"
    })
})

export {crearSalaValidatorSchema}