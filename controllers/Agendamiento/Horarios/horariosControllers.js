const Horario = require('../../../Models/horario');
const Agendamiento = require('../../../Models/agendamiento');

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

        // Verificar si hay fechas con horas ocupadas
        const agendamientoFecha = await Agendamiento.findAll({ where: { fecha } });
        if (agendamientoFecha.length > 0) {
            return res.status(400).json({ error: 'Hay horas ocupadas en esa fecha' });
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

// Eliminar un horario por ID
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

// Inactivar horas específicas en un día
exports.inactivarHoras = async (req, res) => {
    const { fecha, horas } = req.body;
    try {
        const horario = await Horario.findOne({ where: { fecha } });

        if (!horario) {
            // Crear el horario si no existe
            const nuevoHorario = await Horario.create({
                fecha,
                estado: 'activo',
                horas_inactivas: Array.isArray(horas) ? horas.join(',') : horas
            });
            return res.status(201).json(nuevoHorario);
        }

        const horasInactivasActuales = horario.horas_inactivas ? horario.horas_inactivas.split(',') : [];
        const nuevasHorasInactivas = [...new Set([...horasInactivasActuales, ...horas])];
        horario.horas_inactivas = nuevasHorasInactivas.join(',');

        await horario.save();
        res.status(200).json(horario);
    } catch (error) {
        console.error('Error al inactivar horas:', error);
        res.status(500).json({ error: 'Error al inactivar horas' });
    }
};

// Listar horas inactivas por fecha
exports.listarHorasInactivas = async (req, res) => {
    const { fecha } = req.params;
    try {
        const horario = await Horario.findOne({ where: { fecha } });

        if (!horario) {
            return res.status(400).json({ error: 'Fecha no encontrada al listar' });
        }

        const horasInactivas = horario.horas_inactivas ? horario.horas_inactivas.split(',') : [];
        res.status(200).json({ horas_inactivas: horasInactivas });
    } catch (error) {
        console.error('Error al obtener o buscar las horas inactivas:', error);
        res.status(500).json({ error: 'Error al obtener o buscar las horas inactivas' });
    }
};

// Eliminar horas inactivas
exports.eliminarHorasInactivas = async (req, res) => {
    const { fecha, horas } = req.body;
    try {
        const horario = await Horario.findOne({ where: { fecha } });

        if (!horario) {
            return res.status(400).json({ error: 'Fecha no encontrada al eliminar' });
        }

        horario.horas_inactivas = horario.horas_inactivas.filter(hora => !horas.includes(hora));
        await horario.save();
        res.status(200).json(horario);
    } catch (error) {
        console.error('Error al eliminar las horas inactivas:', error);
        res.status(500).json({ error: 'Error al eliminar las horas inactivas' });
    }
};


exports.listarFechasConHorasInactivas = async (req, res) => {
    try {
        // Obtener todos los horarios
        const horarios = await Horario.findAll();
        
        // Filtrar fechas que tengan horas inactivas
        const fechasConHorasInactivas = horarios
            .filter(horario => horario.horas_inactivas && horario.horas_inactivas.split(',').length > 0)
            .map(horario => ({
                fecha: horario.fecha,
                horas_inactivas: horario.horas_inactivas ? horario.horas_inactivas.split(',') : [],
                estado: horario.estado // Agregar el estado del día
            }));

        res.status(200).json(fechasConHorasInactivas);
    } catch (error) {
        console.error('Error al obtener fechas con horas inactivas:', error);
        res.status(500).json({ error: 'Error al obtener fechas con horas inactivas' });
    }
};
