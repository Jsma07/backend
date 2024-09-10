const Cliente = require("../../Models/clientes");
const { Op } = require('sequelize');

async function VerificarCodigo(req, res) {
  try {
    const { codigoVerificacion } = req.body;

    // Buscar el cliente por el código de verificación
    const cliente = await Cliente.findOne({
      where: {
        CodigoVerificacion: codigoVerificacion,
        Verificado: false,
        FechaInicio: {
          [Op.gte]: new Date(Date.now() - 30 * 60 * 1000) // Verificar que no haya pasado más de 30 minutos
        }
      }
    });

    if (!cliente) {
      return res.status(400).json({ mensaje: "Código de verificación inválido o expirado." });
    }

    // Marcar el cliente como verificado y actualizar el estado
    cliente.Verificado = true;
    cliente.Estado = 1; // Cambiar el Estado a 1
    await cliente.save();

    res.status(200).json({
      mensaje: "Correo verificado correctamente.",
      IdCliente: cliente.IdCliente // Usa el nombre del campo correcto
    });
  } catch (error) {
    console.log("Ocurrió un error al verificar el código: ", error);
    res.status(500).json({ mensaje: "Ocurrió un error al verificar el código." });
  }
}

module.exports = { VerificarCodigo };
