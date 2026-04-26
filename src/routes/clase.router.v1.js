import express from "express"
import { crearClase, inscribirUsuario, limpiarUsuarioDeClasesPorDia, obtenerClasePorSuId, obtenerClases, obtenerClasesDelUsuario, removerUsuarioDeInscriptos, subirImagen } from "../controllers/clase.controller.v1.js"
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js";
import { crearClaseValidatorSchemaMiddleware } from "../middlewares/crear.clase.validator.middleware.js";
import multer from "multer";


const claseRouterV1 = express.Router();
const upload = multer()


//Crear
claseRouterV1.post("/clases", soloAdminMiddleware, crearClaseValidatorSchemaMiddleware, crearClase);
//Obtener
claseRouterV1.get("/clases", obtenerClases)
claseRouterV1.get("/clases/clases-usuario", obtenerClasesDelUsuario)
claseRouterV1.get("/clases/:id", obtenerClasePorSuId)
//Modificar - Inscribir Usuarios, Limpiar Inscriptos y Modificar Clases
claseRouterV1.put("/clases/remover-inscripciones-del-dia", soloAdminMiddleware, limpiarUsuarioDeClasesPorDia)
claseRouterV1.put("/clases/:idClase/inscribir-usuario", inscribirUsuario)
claseRouterV1.put("/clases/:idClase/remover-inscripcion", removerUsuarioDeInscriptos)
claseRouterV1.put("/clases/:idClase/imagen",soloAdminMiddleware, upload.single("img"), subirImagen)


//Borrar - Eliminar Clase: Verificar si tiene inscriptos

export { claseRouterV1 }