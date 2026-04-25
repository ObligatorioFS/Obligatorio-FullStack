import express from "express"
import { crearClase, inscribirUsuario, limpiarUsuarioDeClasesPorDia, obtenerClasePorSuId, obtenerClases, obtenerClasesDelUsuario, removerUsuarioDeInscriptos } from "../controllers/clase.controller.v1.js"
import { soloAdminMiddleware } from "../middlewares/auth.middleware.js";
import { crearClaseValidatorSchemaMiddleware } from "../middlewares/crear.clase.validator.middleware.js";




const claseRouterV1 = express.Router();

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


//Borrar - Eliminar Clase: Verificar si tiene inscriptos

export { claseRouterV1 }