import * as claseService from "../services/clase.service.v1.js"


//Crear Clase
const crearClase = async (req, res) => {
    try {
        const nuevaClase = await claseService.crearClase(req.body)
        res.status(201).json(nuevaClase);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Obtener todas las clases
const obtenerClases = async (req, res) => {
      try {
        const {limit, page, dia, idActividad } = req.query
        if (!limit || !page) {
            res.status(400).json({message: "debe enviar pagina y limite"})
            return
        }
        const clases = await claseService.obtenerTodasLasClases(page, limit, dia, idActividad)
        res.status(200).json(clases)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Obtener Clase por su ID
const obtenerClasePorSuId = async (req, res) => {
    const idClase = req.params.id
    try {
        const clase = await claseService.obtenerClasePorSuId(idClase);
        res.status(200).json(clase);
    } catch (e) {
        console.log(e)
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Obtener Clases por UsuarioId
const obtenerClasesDelUsuario = async (req, res) => {
    const idUsuario = req.idUsu;
    try {
        const clases = await claseService.obtenerClasesDelUsuario(idUsuario)
        res.status(200).json(clases)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Inscribir Usuario a Clase Admin
const inscribirUsuarioAdmin = async (req, res) => {
    const idClase = req.params.idClase
    const emailUsuario = req.body.email
    try {
        const { claseConInscripcion, idUsuario } = await claseService.inscribirUsuarioAdmin(idClase, emailUsuario)
        await claseService.enviarEmailBrevo(idUsuario, idClase)
        res.status(200).json(claseConInscripcion)
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}


//Inscribir Usuario a Clase
const inscribirUsuario = async (req, res) => {
    const idClase = req.params.idClase
    const idUsuario = req.idUsu;
    try {
        const claseConInscripcion = await claseService.inscribirUsuario(idClase, idUsuario)
        await claseService.enviarEmailBrevo(idUsuario, idClase);
        res.status(200).json(claseConInscripcion);
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message })
    }
}

//Remover Usuario de Inscripto
const removerUsuarioDeInscriptos = async (req, res) => {
    const idClase = req.params.idClase
    const idUsuario = req.idUsu;
    try {
        const clase = await claseService.removerUsuarioDeInscriptos(idClase, idUsuario)
        res.status(200).json(clase)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//Limpiar Inscriptos de Clases por Dia
const limpiarUsuarioDeClasesPorDia= async(req, res) =>{
    const dia = req.body;
    try {
        const claseLimpiada = await claseService.limpiarUsuarioDeClasesPorDia(dia)
        res.status(200).json(claseLimpiada)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

// Eliminar clase
const eliminarClase = async (req, res) => {
    const idClase = req.params.idClase;
    try {
        await claseService.eliminarClase(idClase);
        res.status(200).json({ message: "Clase eliminada con exito" });
    } catch (e) {
        res.status(e.code || 500).json({ message: e.message });
    }
}

//Notificaion por mail 
/*const enviarMail = async (idUsuario, idClase) => {
    try { 
        await claseService.enviarEmailBrevo(idUsuario, idClase);
    } catch (mailError) {
        console.error("Error al enviar mail de confirmacion:", mailError.message || mailError);
    }
}*/

const subirImagen = async (req, res) => {
    const img = req.file;
    const idClase = req.params.idClase;
    if(!img){
        return res.status(400).json({ message: "No se envio una imagen" });
    }
    if(!img.mimetype.startsWith("image/")){
        return res.status(400).json({ message: "Debe ser un archivo de imagen" });
    }
    try {
        await claseService.agregarImagen(idClase, img);
        res.status(200).json({ message: "Imagen subida con exito"});
    } catch (e) {
        res.status(e.code || e.http_code || 500).json({ message: e.message })
    }
}



export { crearClase, obtenerClases, obtenerClasePorSuId, obtenerClasesDelUsuario, inscribirUsuario, removerUsuarioDeInscriptos, limpiarUsuarioDeClasesPorDia, subirImagen, eliminarClase}
