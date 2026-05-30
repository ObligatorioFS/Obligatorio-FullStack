import express from 'express'
import 'dotenv/config'
import { pingRouter } from './src/routes/ping.routes.js';
import { conectarBD } from './src/config/db_config.js';
import { authMiddleware } from './src/middlewares/auth.middleware.js';
import { logMiddleware } from './src/middlewares/logger.middleware.js';
import { authRouter } from './src/routes/auth.router.v1.js';
import { salaRouterV1 } from './src/routes/sala.router.v1.js';
import { claseRouterV1 } from './src/routes/clase.router.v1.js';
import { rutinaRouterV1 } from './src/routes/rutina.router.v1.js';
import { usuarioRouterV1 } from './src/routes/usuario.router.v1.js';
import { actividadRouterv1 } from './src/routes/actividad.router.v1.js';
import cors from 'cors';





//CORS
const app = express();

app.use(cors());
app.use(express.json());

app.use(logMiddleware)

//Rutas publicas
app.use("/", pingRouter)
app.use("/v1", authRouter)

//Rutas privadas - Creacion de Clases, Inscripciones a Clases y pedir Rutina
app.use(authMiddleware)
//Salas Router:
app.use("/v1", salaRouterV1)
//Clases Router:
app.use("/v1", claseRouterV1)
//Rutinas Router:
app.use("/v1", rutinaRouterV1)
//Usuarios Router:
app.use("/v1", usuarioRouterV1)
//Actividades Router:
app.use("/v1", actividadRouterv1)

conectarBD();

//Inicializamos el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})