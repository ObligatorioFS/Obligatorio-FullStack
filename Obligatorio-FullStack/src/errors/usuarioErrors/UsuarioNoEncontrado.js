class UsuarioNoEncontradoError extends Error {
    constructor() {
        super("Usuario no encontrado"),
        this.code = 404;
    }
}

export { UsuarioNoEncontradoError }