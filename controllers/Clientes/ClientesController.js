// VentasController.js
const Cliente = require("../../Models/clientes");
const bcrypt = require("bcrypt");
const Usuario = require("../../Models/usuarios");
const Empleado = require("../../Models/empleados");
const { Op } = require("sequelize");

async function Listar_Clientes() {
  try {
    const clientes = await Cliente.findAll();
    return clientes;
  } catch (error) {
    console.log("Ocurrió un error al listar los clientes: ", error);
    throw error;
  }
}

async function Crearclientes(req, res) {
  try {
    const datosCrearClientes = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await Usuario.findOne({
      where: { Correo: datosCrearClientes.Correo },
    });
    const empleadoExistente = await Empleado.findOne({
      where: { Correo: datosCrearClientes.Correo },
    });
    const clienteExistente = await Cliente.findOne({
      where: { Correo: datosCrearClientes.Correo },
    });

    if (usuarioExistente || empleadoExistente || clienteExistente) {
      return res
        .status(400)
        .json({ mensaje: "El correo ya está registrado en el sistema." });
    }

    // Verificar si el documento ya está registrado
    const documentoUsuarioExistente = await Usuario.findOne({
      where: { Documento: datosCrearClientes.Documento },
    });
    const documentoEmpleadoExistente = await Empleado.findOne({
      where: { Documento: datosCrearClientes.Documento },
    });
    const documentoClienteExistente = await Cliente.findOne({
      where: { Documento: datosCrearClientes.Documento },
    });

    if (
      documentoUsuarioExistente ||
      documentoEmpleadoExistente ||
      documentoClienteExistente
    ) {
      return res
        .status(400)
        .json({ mensaje: "El documento ya está registrado en el sistema." });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    datosCrearClientes.Contrasena = await bcrypt.hash(
      datosCrearClientes.Contrasena,
      saltRounds
    );

    // Crear el cliente
    const nuevoCliente = await Cliente.create(datosCrearClientes);
    res.status(200).json(nuevoCliente);
  } catch (error) {
    // Manejar el error de validación
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.log("Ocurrió un error al crear el cliente: ", error);
      res.status(500).json({ mensaje: "Ocurrió un error al crear el cliente" });
    }
  }
}

async function ActualizarCliente(req, res) {
  try {
    // Obtener el ID del cliente desde los parámetros de la URL y asegurarse de convertirlo a número
    const idCliente = parseInt(req.params.idCliente, 10);

    if (isNaN(idCliente)) {
      return res.status(400).json({ mensaje: "ID de cliente inválido" });
    }

    // Obtener los datos a actualizar desde el cuerpo de la solicitud
    const datosActualizar = req.body;

    // Verificar que datosActualizar no sea undefined
    if (!datosActualizar) {
      return res
        .status(400)
        .json({ mensaje: "No se proporcionaron datos para actualizar" });
    }

    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    // Validar si el correo está en uso solo si se proporciona
    if (datosActualizar.Correo) {
      const correoExistente =
        (await Usuario.findOne({
          where: { Correo: datosActualizar.Correo },
        })) ||
        (await Empleado.findOne({
          where: { Correo: datosActualizar.Correo },
        })) ||
        (await Cliente.findOne({ where: { Correo: datosActualizar.Correo } }));

      if (correoExistente && correoExistente.IdCliente !== idCliente) {
        return res
          .status(400)
          .json({ mensaje: "El correo ya está registrado en el sistema." });
      }
    }

    // Validar si el documento está en uso solo si se proporciona
    if (datosActualizar.Documento) {
      const documentoExistente =
        (await Usuario.findOne({
          where: { Documento: datosActualizar.Documento },
        })) ||
        (await Empleado.findOne({
          where: { Documento: datosActualizar.Documento },
        })) ||
        (await Cliente.findOne({
          where: { Documento: datosActualizar.Documento },
        }));

      if (documentoExistente && documentoExistente.IdCliente !== idCliente) {
        return res
          .status(400)
          .json({ mensaje: "El documento ya está registrado en el sistema." });
      }
    }

    // Validar el tipo de documento solo si se proporciona
    if (datosActualizar.tipoDocumento) {
      const tiposDocumentoValidos = ["C.C", "C.E"];
      if (!tiposDocumentoValidos.includes(datosActualizar.tipoDocumento)) {
        return res.status(400).json({
          mensaje:
            "Tipo de documento inválido. Los tipos permitidos son: C.C, C.E.",
        });
      }
    }

    // Actualizar el cliente
    await cliente.update(datosActualizar);
    return res.status(200).json(cliente);
  } catch (error) {
    console.log("Ocurrió un error al actualizar el cliente: ", error);
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      return res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      return res
        .status(500)
        .json({ mensaje: "Ocurrió un error al actualizar el cliente" });
    }
  }
}

async function cambiarEstadoCliente(idCliente, nuevoEstado) {
  try {
    // Verificar si el cliente existe
    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    // Actualizar el estado del cliente
    cliente.Estado = nuevoEstado;
    await cliente.save();

    console.log("Estado del cliente actualizado correctamente:", cliente.id);
    return cliente.id;
  } catch (error) {
    console.error("Ocurrió un error al cambiar el estado del cliente:", error);
    throw error;
  }
}

module.exports = {
  Listar_Clientes,
  Crearclientes,
  ActualizarCliente,
  cambiarEstadoCliente,
};
