class CambiarPlanError extends Error {
    constructor() {
        super("Ya tiene Plan Premium"),
        this.code = 400;
    }
}

export { CambiarPlanError }