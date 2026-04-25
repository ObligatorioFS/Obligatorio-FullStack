import mongoose from "mongoose";

const rutinaSchema = new mongoose.Schema({
    ejercicios : { type: [String], trim: true},
    objetivo: { type: String, required: true, trim: true},
    idActividad: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Actividad",
        required: true
    },
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