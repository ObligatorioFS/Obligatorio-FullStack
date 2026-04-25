class DescripcionVaciaError extends Error {
    constructor() {
        super("La descripción no puede estar vacía."),
        this.code = 400
    }
}

export { DescripcionVaciaError }