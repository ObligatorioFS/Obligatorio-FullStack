import express from 'express'
import 'dotenv/config'
import { pingRouter } from './src/routes/ping.routes.js';
import { conectarBD } from './src/config/db_config.js';


const app = express();

app.use(express.json());



//RUTAS PUBLICAS
app.use("/", pingRouter)

conectarBD();

//Inicializamos el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})