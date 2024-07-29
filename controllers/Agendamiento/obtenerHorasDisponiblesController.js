// controllers/Agendamiento/obtenerHorasDisponiblesController.js
const Agendamiento = require('../../Models/Agendamiento');
const dayjs = require('dayjs');

exports.obtenerHorasDisponibles = async (req, res) => {
  try {
    const { fecha } = req.query;

    // Horas posibles en tu rango de tiempo (13:00 a 17:30 con intervalos de 30 minutos)
    const todasLasHoras = [];
    for (let hour = 13; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        todasLasHoras.push(dayjs().hour(hour).minute(minute).format('HH:mm'));
      }
    }

    // Obtener agendamientos para la fecha dada
    const agendamientos = await Agendamiento.findAll({
      where: { Fecha: fecha },
      attributes: ['Hora']
    });

    const horasOcupadas = agendamientos.map(ag => ag.Hora);

    // Filtrar las horas disponibles
    const horasDisponibles = todasLasHoras.filter(hora => !horasOcupadas.includes(hora));

    res.status(200).json(horasDisponibles);
  } catch (error) {
    console.error("Error al obtener las horas disponibles", error);
    res.status(500).json({ error: 'Error al obtener las horas disponibles' });
  }
};
