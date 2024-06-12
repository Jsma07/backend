const { validationResult } = require('express-validator');
const Agendamiento = require('../../Models/agendamiento'); // Asegúrate de que esta ruta sea correcta

exports.crearAgendamiento = async (req, res) => {
  try {
    // Verificar los errores de validación del cuerpo de la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    // Extraer los datos del cuerpo de la solicitud
    const { IdCliente, IdServicio, FechaHora, IdEmpleado, EstadoAgenda } = req.body;

    // Depuración: Verificar que el modelo tiene el método `create`
    console.log("Métodos disponibles en Agendamiento:", Object.keys(Agendamiento));

    // Crear el nuevo agendamiento en la base de datos
    const nuevoAgendamiento = await Agendamiento.create({
      IdCliente,
      IdServicio,
      'Fecha/Hora': FechaHora,
      IdEmpleado,
      EstadoAgenda
    });

    // Responder con el nuevo agendamiento creado
    res.status(201).json({ mensaje: 'Agendamiento creado exitosamente', agendamiento: nuevoAgendamiento });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Manejar errores de validación específicos de Sequelize
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ errores });
    } else {
      // Manejar otros tipos de errores
      console.error("Error al crear el agendamiento", error);
      res.status(500).json({ error: 'Error al crear el agendamiento' });
    }
  }
};
