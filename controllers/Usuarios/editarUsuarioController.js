const Usuario = require("../../Models/usuarios");
const bcrypt = require("bcryptjs");
const { DatosFormateados } = require("./formateoValidaciones");
const { CorreoFormateado } = require("./formateoValidaciones");
const { NumerosFormateados } = require("./formateoValidaciones");

exports.editarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      nombre,
      apellido,
      correo,
      telefono,
      rolId,
      estado,
      Documento,
      tipoDocumento,
    } = req.body;

    nombre = DatosFormateados(nombre);
    apellido = DatosFormateados(apellido);
    correo = CorreoFormateado(correo);
    telefono = NumerosFormateados(telefono);
    Documento = NumerosFormateados(Documento);

    const usuarioActualizado = await Usuario.update(
      {
        nombre,
        apellido,
        correo,
        telefono,
        rolId,
        estado,
        Documento,
        tipoDocumento,
      },
      { where: { id } }
    );
    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
exports.actualizarContrasena = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 8 caracteres." });
    }
    const contrasenaCifrada = await bcrypt.hash(newPassword, 10);

    const usuarioActualizado = await Usuario.update(
      { contrasena: contrasenaCifrada },
      { where: { id } }
    );

    res.status(200).json({
      mensaje: "Contraseña actualizada correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al cambiar la contraseña del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
