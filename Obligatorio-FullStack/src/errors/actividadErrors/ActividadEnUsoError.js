class ActividadEnUsoError extends Error {
    constructor() {
        super("Esta actividad se encuentra en uso por rutinas o clases"),
        this.code = 400
    }
}

export { ActividadEnUsoError }