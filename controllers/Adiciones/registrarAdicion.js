const Adiciones = require('../../Models/adiciones');

const registrarAdicion = async (req, res) => {
  try {
    const { Img, NombreAdiciones, Precio, Estado } = req.body;

    const nuevaAdicion = await Adiciones.create({
      Img,
      NombreAdiciones,
      Precio,
      Estado
    });

    res.status(201).json({ mensaje: 'Adición registrada correctamente', adicion: nuevaAdicion });
  } catch (error) {
    console.error('Error al registrar la adición:', error);
    res.status(500).json({ mensaje: 'Error al registrar la adición', error: error.message });
  }
};

module.exports = {
  registrarAdicion
};
