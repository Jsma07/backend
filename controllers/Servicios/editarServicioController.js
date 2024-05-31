const Servicio = require('../../models/servicios');
const { Op } = require('sequelize');

exports.editarServicio = async (req, res) => {
    try {
        const { IdServicio } = req.params;
        const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, ImgServicio, EstadoServicio } = req.body;

        const updateServicio = await Servicio.findByPk(IdServicio);
        if (!updateServicio) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        // Verificar si el nombre del servicio ya está registrado para otro ID
        if (Nombre_Servicio) {
            const existingServicio = await Servicio.findOne({
                where: {
                    Nombre_Servicio,
                    IdServicio: { [Op.ne]: IdServicio }
                }
            });

            if (existingServicio) {
                return res.status(400).json({ error: 'El nombre del servicio ya está registrado para otro ID.' });
            }
        }

        // Actualizar los campos proporcionados
        await updateServicio.update({
            Nombre_Servicio: Nombre_Servicio ?? updateServicio.Nombre_Servicio,
            Precio_Servicio: Precio_Servicio ?? updateServicio.Precio_Servicio,
            Tiempo_Servicio: Tiempo_Servicio ?? updateServicio.Tiempo_Servicio,
            ImgServicio: ImgServicio ?? updateServicio.ImgServicio,
            EstadoServicio: EstadoServicio ?? updateServicio.EstadoServicio
        });

        res.status(200).json({ mensaje: 'Servicio actualizado correctamente', servicio: updateServicio });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Manejo de errores de validación de Sequelize
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al editar el servicio", error);
            res.status(500).json({ error: 'Error al editar el servicio' });
        }
    }
};
