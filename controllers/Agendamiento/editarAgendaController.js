const { Sequelize } = require('sequelize'); // Importar Sequelize
const Agendamiento = require('../../Models/agendamiento');
const Horario = require('../../Models/horario');
const dayjs = require('dayjs'); 

exports.editarAgendamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { Fecha, Hora, EstadoAgenda } = req.body;

    if (!EstadoAgenda) {
      return res.status(400).json({ error: 'Datos de la cita incompletos' });
    }

    // Verificar que el agendamiento existe
    const agendamiento = await Agendamiento.findByPk(id);
    if (!agendamiento) {
      return res.status(404).json({ error: 'Agendamiento no encontrado' });
    }

    // Si se proporcionan Fecha y Hora, verificar los conflictos
    if (Fecha && Hora) {
      const formattedFecha = dayjs(Fecha).format('YYYY-MM-DD');
      const horario = await Horario.findOne({
        where: {
          fecha: formattedFecha
        }
      });

      if (horario && horario.estado === 'inactivo') {
        return res.status(400).json({ error: 'Esta Fecha es inactiva, no se pueden crear citas' });
      }

      const citaExistente = await Agendamiento.findOne({
        where: {
          Fecha,
          Hora,
          IdAgenda: { [Sequelize.Op.ne]: parseInt(id, 10) } // Excluir la cita actual
        },
      });

      if (citaExistente) {
        return res.status(400).json({ error: 'Ya existe una cita en la misma fecha y hora' });
      }
    }

    // Actualizar solo los campos proporcionados
    const actualizacion = {};
    if (Fecha) actualizacion.Fecha = Fecha;
    if (Hora) actualizacion.Hora = Hora;
    if (EstadoAgenda) actualizacion.EstadoAgenda = EstadoAgenda;

    const [actualizado] = await Agendamiento.update(
      actualizacion,
      { where: { IdAgenda: id } }
    );

    if (actualizado === 1) {
      res.status(200).json({ mensaje: 'Agendamiento actualizado exitosamente' });
    } else {
      res.status(400).json({ error: 'No se pudo actualizar el agendamiento' });
    }
  } catch (error) {
    console.error("Error al actualizar el agendamiento", error);
    res.status(500).json({ error: 'Error al actualizar el agendamiento' });
  }
};
