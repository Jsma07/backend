const Agendamiento = require('../../Models/agendamiento');
const Servicio = require('../../Models/servicios');
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

exports.obtenerHorasOcupadas = async (req, res) => {
  try {
    const { fecha } = req.query;

    const formattedFecha = dayjs(fecha).format('YYYY-MM-DD');

    const agendamientos = await Agendamiento.findAll({
      where: {
        Fecha: formattedFecha,
      },
      include: {
        model: Servicio,
        as: 'servicio', // Usa el alias 'servicio' aquí
        attributes: ['Tiempo_Servicio'],
      },
      attributes: ['Hora'],
      raw: true
    });

    let horasOcupadas = [];

    agendamientos.forEach(ag => {
      const horaInicio = dayjs(`${formattedFecha} ${ag.Hora}`);
      const duracion = ag['servicio.Tiempo_Servicio']; // Duración en minutos
      const horas = Math.ceil(duracion / 60); // Número de horas a ocupar

      for (let i = 0; i < horas; i++) {
        horasOcupadas.push(horaInicio.add(i, 'hour').format('HH:mm'));
      }
    });

    // Mostrar las horas ocupadas obtenidas en la consola
    console.log('Horas ocupadas obtenidas:', horasOcupadas);

    res.status(200).json(horasOcupadas);
  } catch (error) {
    console.error("Error al obtener las horas ocupadas", error);
    res.status(500).json({ error: 'Error al obtener las horas ocupadas' });
  } 
};
