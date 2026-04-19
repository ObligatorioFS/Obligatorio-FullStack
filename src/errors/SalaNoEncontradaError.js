class SalaNoEncontrada extends Error {
    constructor() {
        super("sala no encontrada"),
        this.code = 404
    }
}

export { SalaNoEncontrada }