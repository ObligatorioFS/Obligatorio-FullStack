import mongoose from "mongoose";

const actividadSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true,  trim: true, lowercase: true },
    descripcion: { type: String, required: true, trim: true},
}, {
    timestamps: true,
    collection: "actividades"
});

const Actividad = mongoose.model("Actividad", actividadSchema);

export { Actividad };