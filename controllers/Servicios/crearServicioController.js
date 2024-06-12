const Servicio = require('../../Models/servicios');

exports.guardarServicio = async (req, res) => {
  try {
    const { ImgServicio, Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, EstadoServicio } = req.body;

    // Verificar si el nombre del servicio ya está registrado
    const existingServicio = await Servicio.findOne({ where: { Nombre_Servicio } });
    if (existingServicio) {
      return res.status(400).json({ error: 'El nombre del servicio ya está registrado.' });
    }
    // Si todo está bien, proceder a guardar el servicio
    const nuevoServicio = await Servicio.create({
      ImgServicio,
      Nombre_Servicio,
      Precio_Servicio,
      Tiempo_Servicio,
      EstadoServicio,
    });

    res.status(200).json({ Estado: 'guardado correctamente', servicio: nuevoServicio });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error("Error al guardar el servicio", error);
      res.status(500).json({ error: 'Error al guardar el servicio' });
    }
  }
};
