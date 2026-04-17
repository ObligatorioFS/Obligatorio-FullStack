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
// mongodb+srv://FeliAdmin:Feli1234@cluster-club.ybdvjro.mongodb.net/
// mongodb+srv://FeliAdmin:Feli1234@cluster-club.ybdvjro.mongodb.net/
// mongodb+srv://LucasAdmin:Lukitas.1170!@cluster-club.ybdvjro.mongodb.net/
// El del profe: mongodb+srv://${usuario}:${password}@cluster-nota-api.1q7nkjl.mongodb.net/${nombreBase}?appName=cluster-nota-api
export { conectarBD }