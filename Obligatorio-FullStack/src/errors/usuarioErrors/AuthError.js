class AuthError extends Error {
    constructor() {
        super("No autorizado"),
        this.code = 403;
    }
}

export { AuthError }