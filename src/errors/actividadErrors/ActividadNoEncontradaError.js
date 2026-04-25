class ActividadNoEncontradaError extends Error {
    constructor() {
        super("No se encontro actividad en el sistema"),
        this.code = 404
    }
}

export { ActividadNoEncontradaError }