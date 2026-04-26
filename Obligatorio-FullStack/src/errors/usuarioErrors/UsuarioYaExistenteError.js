class UsuarioYaExistenteError extends Error {
    constructor() {
        super("Ya existe un usuario registrado con ese email"),
        this.code = 409
    }
}

export { UsuarioYaExistenteError }