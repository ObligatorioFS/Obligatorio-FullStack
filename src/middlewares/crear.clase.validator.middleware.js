import { crearClaseValidatorSchema } from "../validators/crear.clase.validator.v1.js";

const crearClaseValidatorSchemaMiddleware = (req, res, next) => {
    const { error } = crearClaseValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { crearClaseValidatorSchemaMiddleware }