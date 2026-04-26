class ClaseYaExisteError extends Error {
    constructor() {
        super("Ya existe una clase en esa sala, día y hora"),
        this.code = 400
    }
}

export { ClaseYaExisteError }