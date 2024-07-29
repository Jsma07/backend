// VentasController.js
const Cliente = require("../../Models/clientes");
const bcrypt = require("bcrypt");
const usuarios = require("../../Models/usuarios");
const empleados = require("../../Models/empleados");
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

    const usuario = await usuarios.findOne({
      where: {
        [Op.or]: [
          { Documento: datosCrearClientes.Documento },
          { correo: datosCrearClientes.Correo },
          { telefono: datosCrearClientes.Telefono },
        ],
      },
    });

    const empleado = await empleados.findOne({
      where: {
        [Op.or]: [
          { Documento: datosCrearClientes.Documento },
          { Correo: datosCrearClientes.Correo },
          { Telefono: datosCrearClientes.Telefono },
        ],
      },
    });

    if (usuario || empleado) {
      let mensaje = "";
      let campo = "";
      let tabla = "";
      let valorConflicto = "";

      if (usuario) {
        mensaje = "Ya existe";
        tabla = "usuarios";

        if (usuario.Documento === datosCrearClientes.Documento) {
          campo = "Documento";
          valorConflicto = datosCrearClientes.Documento;
        } else if (usuario.correo === datosCrearClientes.Correo) {
          campo = "correo";
          valorConflicto = datosCrearClientes.Correo;
        } else if (usuario.telefono === datosCrearClientes.Telefono) {
          campo = "telefono";
          valorConflicto = datosCrearClientes.Telefono;
        }
      } else if (empleado) {
        mensaje = "Ya existe  ";
        tabla = "empleados";

        if (empleado.Documento === datosCrearClientes.Documento) {
          campo = "Documento";
          valorConflicto = datosCrearClientes.Documento;
        } else if (empleado.Correo === datosCrearClientes.Correo) {
          campo = "Correo";
          valorConflicto = datosCrearClientes.Correo;
        } else if (empleado.Telefono === datosCrearClientes.Telefono) {
          campo = "Telefono";
          valorConflicto = datosCrearClientes.Telefono;
        }
      }

      if (campo && valorConflicto) {
        res.status(400).json({
          mensaje: `${mensaje} en la tabla ${tabla}, campo ${campo}: ${valorConflicto}`,
        });
      } else {
        res.status(400).json({
          mensaje: "Conflicto de datos en la creación del cliente",
        });
      }
      return;
    }

    // Encriptar la contraseña
    const saltRounds = 10; // Número de rondas para generar el salt
    datosCrearClientes.Contrasena = await bcrypt.hash(
      datosCrearClientes.Contrasena,
      saltRounds
    );

    const nuevoCliente = await Cliente.create(datosCrearClientes);
    res.status(201).json({ mensaje: "Cliente creado", cliente: nuevoCliente });
  } catch (error) {
    // Manejar el error de validación
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.log("OCURRIO UN ERROR AL CREAR EL CLIENTE: ", error);
      res.status(500).json({ mensaje: "Ocurrió un error al crear el cliente" });
    }
  }
}

async function ActualizarCliente(idCliente, datosActualizar) {
  try {
    if (datosActualizar.Estado && !Number.isInteger(datosActualizar.Estado)) {
      throw new Error("El campo Estado debe ser un número entero");
    }
    const cliente = await Cliente.findByPk(idCliente);
    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    // Validar si el documento, correo o teléfono ya existen en la tabla de usuarios o empleados
    const usuario = await usuarios.findOne({
      where: {
        [Op.or]: [
          { Documento: datosActualizar.Documento },
          { correo: datosActualizar.Correo },
          { telefono: datosActualizar.Telefono },
        ],
      },
    });

    const empleado = await empleados.findOne({
      where: {
        [Op.or]: [
          { Documento: datosActualizar.Documento },
          { Correo: datosActualizar.Correo },
          { Telefono: datosActualizar.Telefono },
        ],
      },
    });

    if (usuario || empleado) {
      let mensaje = "";
      let campo = "";
      let tabla = "";
      let valorConflicto = "";

      if (usuario) {
        mensaje = "Ya existe";
        tabla = "usuarios";

        if (usuario.Documento === datosActualizar.Documento) {
          campo = "Documento";
          valorConflicto = datosActualizar.Documento;
        } else if (usuario.correo === datosActualizar.Correo) {
          campo = "correo";
          valorConflicto = datosActualizar.Correo;
        } else if (usuario.telefono === datosActualizar.Telefono) {
          campo = "telefono";
          valorConflicto = datosActualizar.Telefono;
        }
      } else if (empleado) {
        mensaje = "Ya existe  ";
        tabla = "empleados";

        if (empleado.Documento === datosActualizar.Documento) {
          campo = "Documento";
          valorConflicto = datosActualizar.Documento;
        } else if (empleado.Correo === datosActualizar.Correo) {
          campo = "Correo";
          valorConflicto = datosActualizar.Correo;
        } else if (empleado.Telefono === datosActualizar.Telefono) {
          campo = "Telefono";
          valorConflicto = datosActualizar.Telefono;
        }
      }

      if (campo && valorConflicto) {
        res.status(400).json({
          mensaje: `${mensaje} en la tabla ${tabla}, campo ${campo}: ${valorConflicto}`,
        });
      } else {
        res.status(400).json({
          mensaje: "Conflicto de datos en la actualización del cliente",
        });
      }
      return;
    }

    await cliente.update(datosActualizar);
    return cliente.id;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.log("OCURRIO UN ERROR AL ACTUALIZAR EL CLIENTE: ", error);
      res
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
