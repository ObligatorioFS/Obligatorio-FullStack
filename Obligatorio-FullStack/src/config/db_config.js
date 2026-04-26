import mongoose from "mongoose";

const conectarBD = async () => {
    const nombreBase = process.env.MONGO_DB_NAME
    const usuario = process.env.MONGO_DB_USER
    const password = process.env.MONGO_DB_PASSWORD
    try {
        await mongoose.connect(`mongodb+srv://${usuario}:${password}@cluster-club.ybdvjro.mongodb.net/${nombreBase}?appName=cluster-club`)
        console.log("BD Conectada")
    } catch (e) {
        console.log("Error al conectar con mongo db :(");
        
        process.exit(1);
    }
}
export { conectarBD }