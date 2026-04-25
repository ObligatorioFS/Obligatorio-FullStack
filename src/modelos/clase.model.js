import mongoose from "mongoose";

const claseSchema = new mongoose.Schema({
    descripcion: { type: String, required: true, trim: true},
    dia:    { type: String, required: true, enum: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]},
    hora:   { type: String, required: true, trim: true},
    capacidadMax: { type: Number, required: true, min: 1},
    actividad: { type: mongoose.Schema.Types.ObjectId, ref: "Actividad", required: true},
    sala:   { type: mongoose.Schema.Types.ObjectId, ref: "Sala", required: true},
    inscriptos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario"}]
}, {
    timestamps: true,
    collection: "clases"
});

const Clase = mongoose.model("Clase", claseSchema);

export { Clase };
