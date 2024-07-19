const ConexionDB = require('../../Db/Conexion');

exports.listarAgendamientos = async (req, res) => {
  try {
    const connection = await ConexionDB();
    const [rows, fields] = await connection.execute('SELECT * FROM agendamiento');
    await connection.end(); // Cierra la conexión después de usarla

    // Renombrar campo "Fecha/Hora" a "FechaHora" en cada registro
    const formattedRows = rows.map(row => ({
      ...row,
      FechaHora: row['Fecha/Hora']
    }));

    res.status(200).json(formattedRows);
  } catch (error) {
    console.error("Error al buscar las citas", error);
    res.status(400).json({ error: 'Error al buscar la cita' });
  }
};
