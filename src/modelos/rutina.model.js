import mongoose from "mongoose";

const rutinaSchema = new mongoose.Schema({
    ejercicios : { type: [String], required: true, trim: true},
    actividad: { type: String, required: true, trim: true},
    objetivo: { type: String, required: true, trim: true},
    idUsuario: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
}, {
    timestamps: true,
});

const Rutina = mongoose.model("Rutina", rutinaSchema);

export { Rutina };