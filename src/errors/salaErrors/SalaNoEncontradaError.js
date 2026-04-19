class SalaNoEncontrada extends Error {
    constructor() {
        super("Sala no encontrada"),
        this.code = 404
    }
}

export { SalaNoEncontrada }