const bcrypt = require('bcryptjs');
const Cliente = require('../../Models/clientes'); // Asegúrate de importar tu modelo

const actualizarContrasena = async (req, res) => {
  const { correo, nuevaContrasena } = req.body;

  if (!correo || !nuevaContrasena) {
    return res.status(400).json({ mensaje: 'Correo y nueva contraseña son requeridos' });
  }

  try {
    const cliente = await Cliente.findOne({ where: { Correo: correo } });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(nuevaContrasena, salt);

    await Cliente.update({ Contrasena: hashedPassword }, { where: { Correo: correo } });

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la contraseña' });
  }
};

module.exports = {
  actualizarContrasena,
  // Exporta otros controladores según sea necesario
};
