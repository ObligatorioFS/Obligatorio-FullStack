class CuposLlenosError extends Error {
    constructor() {
        super("No hay cupos disponibles"),
        this.code = 400
    }
}

export { CuposLlenosError }