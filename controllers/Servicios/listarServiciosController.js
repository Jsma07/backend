const ConexionDB = require('../../Db/Conexion');

exports.listarServicios = async (req, res) => {
  try {
    const connection = await ConexionDB();
    const [rows, fields] = await connection.query('SELECT IdServicio, ImgServicio, Nombre_Servicio, Tiempo_Servicio, EstadoServicio, FORMAT(Precio_Servicio, 2, "es_CO") AS Precio_Servicio FROM servicios');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al buscar los servicios", error);
    res.status(500).json({ error: 'Error al buscar los servicios' });
  }
};
