class ClaseNoEncontrada extends Error {
    constructor() {
        super("Clase no encontrada"),
        this.code = 404
    }
}

export { ClaseNoEncontrada }