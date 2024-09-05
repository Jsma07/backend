const ConexionDB = require('../../Db/Conexion');

exports.listarServicios = async (req, res) => {
  try {
    const connection = await ConexionDB();
    const query = `
      SELECT 
        IdServicio, 
        ImgServicio, 
        Nombre_Servicio, 
        CONCAT(FLOOR(Tiempo_Servicio / 60), ' Hora(s)') AS Tiempo_Servicio, 
        EstadoServicio, 
        Descripcion_Servicio,
        Precio_Servicio
      FROM servicios
    `;
    const [rows, fields] = await connection.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al buscar los servicios", error);
    res.status(500).json({ error: 'Error al buscar los servicios' });
  }
};
