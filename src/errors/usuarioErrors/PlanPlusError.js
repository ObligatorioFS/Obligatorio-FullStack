class PlanPlusError extends Error {
    constructor() {
        super("El usuario plus no puede tener más de 4 clases"),
        this.code = 400
    }
}

export { PlanPlusError }