const usuarioDto = (usuario) => {
    return {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        plan: usuario.plan,
    }
}

export { usuarioDto }