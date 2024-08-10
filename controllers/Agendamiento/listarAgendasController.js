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




    // const connection = await ConexionDB();
    // const [rows, fields] = await connection.execute('SELECT * FROM agendamiento');
    // await connection.end(); // Cierra la conexión después de usarla

    // // Renombrar campo "Fecha/Hora" a "FechaHora" en cada registro
    // const formattedRows = rows.map(row => ({
    //   ...row,
    //   FechaHora: row['Fecha/Hora']
    // }));

    // res.status(200).json(formattedRows);