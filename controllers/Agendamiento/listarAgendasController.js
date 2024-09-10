const ConexionDB = require('../../Db/Conexion');
const Agendamiento = require('../../Models/agendamiento');
const Cliente = require('../../Models/clientes');
const Empleado = require('../../Models/empleados');
const Servicio = require('../../Models/servicios');
const dayjs = require('dayjs');



exports.listarAgendamientos = async (req, res) => {
  try {
    const listarAgendamientos = await Agendamiento.findAll({
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['Nombre', 'Apellido']
        },
        {
          model: Empleado,
          as: 'empleado',
          attributes: ['Nombre', 'Apellido']
        },
        {
          model: Servicio,
          as: 'servicio',
          attributes: ['ImgServicio', 'Nombre_Servicio', 'Tiempo_Servicio']
        }
      ]
    });

    // Calcula HoraFin para cada agendamiento
    const listaConHoraFin = listarAgendamientos.map(agendamiento => {
      const duracion = agendamiento.servicio.Tiempo_Servicio; // Duración en minutos
      const horaInicio = dayjs(`${agendamiento.Fecha} ${agendamiento.Hora}`);
      const horaFin = horaInicio.add(duracion, 'minute').format('HH:mm');
      
      return {
        ...agendamiento.toJSON(),
        HoraFin: horaFin
      };
    });

    res.status(200).json(listaConHoraFin);
  } catch (error) {
    console.error("Error al buscar las citas", error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
};

