const Servicio = require('../../../Models/servicios');

exports.editarServicio = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del servicio a editar desde los parámetros de la URL
        const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, ImgServicio, EstadoServicio } = req.body;

        // Verifica que se hayan enviado al menos uno de los campos a actualizar
        if (!Nombre_Servicio && !Precio_Servicio && !Tiempo_Servicio && !ImgServicio && !EstadoServicio) {
            return res.status(400).json({ error: 'Debes proporcionar al menos un campo para actualizar' });
        }

        // Encuentra el servicio por ID y actualiza los datos
        const servicioActualizado = await Servicio.update(
            { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, ImgServicio, EstadoServicio },
            { where: { IdServicio: id } } // Filtra por ID
        );

        if (servicioActualizado[0] === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        // Devuelve la respuesta con el servicio actualizado
        res.json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
