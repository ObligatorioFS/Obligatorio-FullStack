import { crearSalaValidatorSchema } from "../validators/crear.sala.validator.v1.js";

const crearSalaValidatorSchemaMiddleware = (req, res, next) => {
    const { error } = crearSalaValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { crearSalaValidatorSchemaMiddleware }