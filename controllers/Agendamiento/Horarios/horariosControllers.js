const Horario = require('../../../Models/horario');

// Crear un nuevo horario
exports.crearHorario = async (req, res) => {
    const { fecha, estado } = req.body;
    try {
        console.log('Datos recibidos:', { fecha, estado });

        // Verificar si la fecha ya está marcada como inactiva
        const fechaExistente = await Horario.findOne({ where: { fecha } });
        if (fechaExistente) {
            return res.status(400).json({ error: 'La fecha ya está marcada como inactiva' });
        }

        const nuevoHorario = await Horario.create({ fecha, estado });
        res.status(201).json(nuevoHorario);
    } catch (error) {
        console.error('Error al crear el horario:', error);
        res.status(500).json({ error: 'Error al crear el horario' });
    }
};

// Listar todos los horarios
exports.obtenerHorarios = async (req, res) => {
    try {
        const horarios = await Horario.findAll();
        res.status(200).json(horarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
};

// Actualizar un horario por ID
exports.actualizarHorario = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const horario = await Horario.findByPk(id);
        if (horario) {
            horario.estado = estado;
            await horario.save();
            res.status(200).json(horario);
        } else {
            res.status(404).json({ error: 'Horario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el horario' });
    }
};

exports.eliminarHorario = async (req, res) => {
    const { id } = req.params;
    try {
        const horario = await Horario.findByPk(id);
        if (horario) {
            await horario.destroy();
            res.status(200).json({ message: 'Horario eliminado con éxito' });
        } else {
            res.status(404).json({ error: 'Horario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el horario:', error);
        res.status(500).json({ error: 'Error al eliminar el horario' });
    }
};

