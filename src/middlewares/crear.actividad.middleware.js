import { actividadValidatorSchema } from "../validators/crear.actividad.validator.v1.js"


const crearActividadValidatorSchemaMiddleware = (req, res, next) => {
    const { error } = actividadValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { crearActividadValidatorSchemaMiddleware }