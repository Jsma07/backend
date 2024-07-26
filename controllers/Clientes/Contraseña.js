const bcrypt = require('bcrypt');
const Cliente = require('../../Models/clientes');

async function cambiarContrasena(req, res) {
  const { idCliente } = req.params;
  const { nuevaContrasena } = req.body;

  if (!nuevaContrasena) {
    return res.status(400).json({ message: 'La nueva contraseña es requerida.' });
  }

  try {
    // Validar el formato de la nueva contraseña si es necesario
    if (nuevaContrasena.length < 8 || nuevaContrasena.length > 100) {
      return res.status(400).json({ message: 'La contraseña debe tener entre 8 y 100 caracteres.' });
    }

    // Buscar el cliente por ID
    const cliente = await Cliente.findByPk(idCliente);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    // Encriptar la nueva contraseña
    const hash = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar la contraseña del cliente
    cliente.Contrasena = hash;
    await cliente.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Ocurrió un error al cambiar la contraseña.' });
  }
}

module.exports = { cambiarContrasena };
