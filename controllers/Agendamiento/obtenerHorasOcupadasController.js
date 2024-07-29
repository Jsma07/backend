const Agendamiento = require('../../Models/Agendamiento');
const dayjs = require('dayjs');

exports.obtenerHorasOcupadas = async (req, res) => {
  try {
    const { fecha } = req.query;
    console.log("Fecha recibida:", fecha);

    // Formatea la fecha si es necesario
    const formattedFecha = dayjs(fecha).format('YYYY-MM-DD');
    console.log("Fecha formateada:", formattedFecha);

    const agendamientos = await Agendamiento.findAll({
      where: {
        Fecha: formattedFecha,
      },
      attributes: ['Hora']
    });

    console.log("Agendamientos encontrados:", agendamientos);

    const horasOcupadas = agendamientos.map(ag => ag.Hora);
    console.log("Horas ocupadas:", horasOcupadas);

    res.status(200).json(horasOcupadas);
  } catch (error) {
    console.error("Error al obtener las horas ocupadas", error);
    res.status(500).json({ error: 'Error al obtener las horas ocupadas' });
  }
};
