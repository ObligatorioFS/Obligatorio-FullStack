class CapacidadSuperadaError extends Error {
    constructor() {
        super("La capacidad maxima de la clase supera a la capacidad de la Sala"),
        this.code = 400
    }
}

export { CapacidadSuperadaError }