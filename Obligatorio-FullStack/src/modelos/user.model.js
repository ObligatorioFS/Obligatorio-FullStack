import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: {  required: true , type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
    plan: { type: String, required: true }
}, {
    timestamps: true,
    collection: "usuarios"
})

const Usuario = mongoose.model("Usuario", userSchema)

export { Usuario }