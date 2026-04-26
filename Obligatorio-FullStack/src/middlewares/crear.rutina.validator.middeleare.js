import { crearRutinaValidatorSchema } from "../validators/crear.rutina.validator.v1.js";

const crearRutinaValidatorSchemaMiddleware = (req, res, next) => {
    const { error } = crearRutinaValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { crearRutinaValidatorSchemaMiddleware }