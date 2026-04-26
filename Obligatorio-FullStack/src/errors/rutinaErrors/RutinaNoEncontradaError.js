class RutinaNoEncontrada extends Error {
    constructor() {
        super("Rutina no encontrada"),
        this.code = 404
    }
}

export { RutinaNoEncontrada }