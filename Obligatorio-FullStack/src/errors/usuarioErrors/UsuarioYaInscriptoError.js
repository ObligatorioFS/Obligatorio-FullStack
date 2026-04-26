class YaInscriptoError extends Error {
    constructor() {
        super("El usuario ya está inscripto en esta clase"),
        this.code = 400
    }
}

export { YaInscriptoError }