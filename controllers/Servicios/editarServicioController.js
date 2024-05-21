const Servicio = require('../../models/servicios');
const { Op } = require('sequelize');

exports.editarServicio = async (req, res) => {
    try {
        const { IdServicio } = req.params; 
        const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, ImgServicio, EstadoServicio } = req.body;

        // Verificar si el nombre del servicio ya está registrado para otro ID
        const existingServicio = await Servicio.findOne({
            where: {
                Nombre_Servicio,
                IdServicio: { [Op.ne]: IdServicio }
            }
        });

        if (existingServicio) {
            return res.status(400).json({ error: 'El nombre del servicio ya está registrado para otro ID.' });
        }

        // Si todo está bien, actualiza el servicio
        const [updated] = await Servicio.update(
            { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, ImgServicio, EstadoServicio },
            { where: { IdServicio } }
        );

        if (updated) {
            const updatedServicio = await Servicio.findByPk(IdServicio);
            res.status(200).json({ mensaje: 'Servicio actualizado correctamente', servicio: updatedServicio });
        } else {
            res.status(404).json({ error: 'Servicio no encontrado' });
        }
    } catch (error) {
        console.error("Error al editar el servicio", error);
        res.status(500).json({ error: 'Error al editar el servicio' });
    }
};
