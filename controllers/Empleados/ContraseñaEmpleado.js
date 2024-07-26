const bcrypt = require('bcrypt');
const Empleado = require("../../Models/empleados");

async function cambiarContrasena(req, res) {
  try {
    const id = req.params.id;
    const { Contrasena } = req.body;

    // Busca el empleado por su ID
    const empleado = await Empleado.findByPk(id);

    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Cifra la nueva contraseña
    const hashedPassword = await bcrypt.hash(Contrasena, 10);

    // Actualiza la contraseña del empleado
    empleado.Contrasena = hashedPassword;
    await empleado.save();

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
}

module.exports = cambiarContrasena;
