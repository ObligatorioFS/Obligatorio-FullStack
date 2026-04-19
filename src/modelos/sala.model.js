import mongoose from "mongoose";

const salaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    capacidadMax: { type: Number, required: true, min: 1}
}, {
    timestamps: true,
    collection: "salas"
});

const Sala = mongoose.model("Sala", salaSchema);

export { Sala };