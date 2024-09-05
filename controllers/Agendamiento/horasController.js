const Agendamiento = require('../../Models/agendamiento');
const Servicio = require('../../Models/servicios');
const dayjs = require('dayjs');

exports.obtenerHorasOcupadas = async (req, res) => {
  try {
    const { fecha } = req.query;
    const fechaActual = dayjs().format('YYYY-MM-DD');
    const horaActual = dayjs().format('HH:mm');

    const formattedFecha = dayjs(fecha).format('YYYY-MM-DD');

    const agendamientos = await Agendamiento.findAll({
      where: {
        Fecha: formattedFecha,
      },
      include: {
        model: Servicio,
        as: 'servicio',
        attributes: ['Tiempo_Servicio'],
      },
      attributes: ['Hora'],
      raw: true
    });

    let horasOcupadas = [];

    agendamientos.forEach(ag => {
      const horaInicio = dayjs(`${formattedFecha} ${ag.Hora}`);
      const duracion = ag['servicio.Tiempo_Servicio'];
      const horas = Math.ceil(duracion / 60);

      for (let i = 0; i < horas; i++) {
        const horaOcupada = horaInicio.add(i, 'hour').format('HH:mm');
        
        // Filtrar las horas anteriores a la hora actual solo si es la fecha actual
        if (formattedFecha !== fechaActual || horaOcupada >= horaActual) {
          horasOcupadas.push(horaOcupada);
        }
      }
    });

    console.log('Horas ocupadas obtenidas:', horasOcupadas);

    res.status(200).json(horasOcupadas);
  } catch (error) {
    console.error("Error al obtener las horas ocupadas", error);
    res.status(500).json({ error: 'Error al obtener las horas ocupadas' });
  } 
};
