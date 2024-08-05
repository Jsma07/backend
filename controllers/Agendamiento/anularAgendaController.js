const Agendamiento = require('../../Models/agendamiento'); 

const anularAgendamiento = async (req, res) => {
  const { id } = req.params;

  try {
    const agendamiento = await Agendamiento.findByPk(id);

    if (!agendamiento) {
      return res.status(404).json({ message: 'Agendamiento no encontrado' });
    }

    await agendamiento.update({ EstadoAgenda: 2 });

    res.status(200).json({ message: 'Agendamiento anulado con éxito' });
  } catch (error) {
    console.error('Error al anular el agendamiento:', error);
    res.status(500).json({ message: 'Error al anular el agendamiento' });
  }
};

module.exports = anularAgendamiento;
