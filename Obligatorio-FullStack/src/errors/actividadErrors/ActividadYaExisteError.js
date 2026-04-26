class ActividadYaExisteError extends Error {
    constructor() {
        super("Ya existe esa activdad"),
        this.code = 409
    }
}

export { ActividadYaExisteError }