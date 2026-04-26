import Joi from "joi";

const validarRegistroNuevoUsuario = Joi.object({
    nombre: Joi.string().min(2).max(20).required().messages({
        "string.min": "El nombre debe tener minimo 2 caracteres",
        "string.max": "El nombre debe tener maximo 20 caracteres",
        "any.required": "El nombre es mandatorio"
    }),
    apellido: Joi.string().min(2).max(20).required().messages({
        "string.min": "El apellido debe tener minimo 2 caracteres",
        "string.max": "El apellido debe tener maximo 20 caracteres",
        "any.required": "El apellido es mandatorio"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Debe tener formato de email",
        "any.required": "El email es mandatorio"
    }),
    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
        .required()
        .messages({
            "string.min": "La contraseña debe tener mínimo 8 caracteres",
            "string.max": "La contraseña debe tener máximo 20 caracteres",
            "string.pattern.base": "Debe tener al menos una mayúscula, una minúscula y un número",
            "any.required": "La contraseña es obligatoria"
        })
});

const validarLoginUsuario = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Debe tener formato de email",
        "any.required": "El email es obligatorio",
        "string.empty": "El email no puede estar vacío"
    }),
    password: Joi.string().required().messages({
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no puede estar vacía"
    })
});


export {validarRegistroNuevoUsuario, validarLoginUsuario}
