const Agendamiento = require('../../Models/agendamiento');
const Servicio = require('../../Models/servicios');
const dayjs = require('dayjs');

exports.obtenerHorasOcupadas = async (req, res) => {
  try {
    const { fecha, idEmpleado } = req.query;
    
    // Verificar si idEmpleado está definido
    if (!idEmpleado) {
      return res.status(400).json({ error: 'IdEmpleado es requerido' });
    }

    const formattedFecha = dayjs(fecha).format('YYYY-MM-DD');

    const agendamientos = await Agendamiento.findAll({
      where: {
        Fecha: formattedFecha,
        IdEmpleado: idEmpleado,
      },
      include: {
        model: Servicio,
        as: 'servicio',
        attributes: ['Tiempo_Servicio'],
      },
      attributes: ['Hora'],
      raw: true,
    });

    let horasOcupadas = [];

    agendamientos.forEach((ag) => {
      const horaInicio = dayjs(`${formattedFecha} ${ag.Hora}`, 'YYYY-MM-DD HH:mm');
      const duracion = ag['servicio.Tiempo_Servicio'];
      const horas = Math.ceil(duracion / 60);

      for (let i = 0; i < horas; i++) {
        const horaOcupada = horaInicio.add(i, 'hour').format('HH:mm');
        horasOcupadas.push(horaOcupada);
      }
    });

    horasOcupadas = [...new Set(horasOcupadas)];

    res.status(200).json(horasOcupadas);
  } catch (error) {
    console.error('Error al obtener las horas ocupadas:', error);
    res.status(500).json({ error: 'Error al obtener las horas ocupadas' });
  }
};
