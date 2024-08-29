const ConexionDB = require('../../Db/Conexion');
const Agendamiento = require('../../Models/agendamiento');
const Cliente = require('../../Models/clientes');
const Empleado = require('../../Models/empleados');
const Servicio = require('../../Models/servicios');

exports.listarAgendamientos = async (req, res) => {
  try {
    
    const listarAgendamientos = await Agendamiento.findAll({
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['IdCliente','Nombre', 'Apellido']
        },
        {
          model: Empleado,
          as: 'empleado',
          attributes: ['Nombre', 'Apellido']  
        },
        {
          model: Servicio,
          as: 'servicio',
          attributes: ['ImgServicio', 'Nombre_Servicio', ]
        }
      ]
    });
    res.status(200).json(listarAgendamientos);
  } catch (error) {
    console.error("Error al buscar las citas", error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
  }
};

