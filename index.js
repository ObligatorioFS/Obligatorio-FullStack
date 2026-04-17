import express from 'express'
import 'dotenv/config'
import { pingRouter } from './src/routes/ping.routes.js';
import { conectarBD } from './src/config/db_config.js';
import { authMiddleware } from './src/middlewares/auth.middleware.js';
import { logMiddleware } from './src/middlewares/logger.middleware.js';
import { authRouter } from './src/routes/auth.router.v1.js';




const app = express();

app.use(express.json());

app.use(logMiddleware)

//Rutas publicas
app.use("/", pingRouter)
app.use("/v1", authRouter)

//Rutas privadas
app.use(authMiddleware)

conectarBD();

//Inicializamos el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})