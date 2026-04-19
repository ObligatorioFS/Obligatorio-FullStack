import * as salasService from "../services/sala.service.v1.js"

//Crear Sala Controller
const crearSalaController = async (req, res) => {
    try {
        const nuevaSala = await salasService.crearSalaService(req.body)
        res.status(201).json(nuevaSala);
    } catch (e) {
        res.status(500).json({ message: "error al crear la nota" });
    }
}

export { crearSalaController }