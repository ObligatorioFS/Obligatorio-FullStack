class PlanPlusRutinaError extends Error {
    constructor() {
        super("El usuario plus no puede tener más de 4 rutinas");
        this.code = 400;
    }
}

export { PlanPlusRutinaError }