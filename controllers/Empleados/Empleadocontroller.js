// VentasController.js
const empleado = require("../../Models/empleados");
const Rol = require("../../Models/roles");
const bcrypt = require('bcryptjs');
const Cliente = require("../../Models/clientes");
const Usuario = require("../../Models/usuarios");
const Empleado = require("../../Models/empleados");

async function Listar_Empleados() {
  try {
    const Empleados = await Empleado.findAll({
      include: {
        model: Rol,
        attributes: ["idRol", "nombre"],
      },
    });
    return Empleados;
  } catch (error) {
    console.log("OCURRIO UN ERROR AL LISTAR LOS EMPLEADOS: ", error);
    throw error;
  }
}

async function CrearEmpleados(DatosCrearEmpleados, res) {
  try {
    // Verifica si el rol especificado existe en la tabla de roles
    const rolExistente = await Rol.findByPk(DatosCrearEmpleados.IdRol);
    if (!rolExistente) {
      return res.status(400).json({ mensaje: "El rol especificado no existe" });
    }

    // Verificar si el correo ya está registrado
    const correoExistente =
      (await Usuario.findOne({
        where: { Correo: DatosCrearEmpleados.Correo },
      })) ||
      (await Empleado.findOne({
        where: { Correo: DatosCrearEmpleados.Correo },
      })) ||
      (await Cliente.findOne({
        where: { Correo: DatosCrearEmpleados.Correo },
      }));

    if (correoExistente) {
      return res
        .status(400)
        .json({ mensaje: "El correo ya está registrado en el sistema." });
    }

    // Verificar si el documento ya está registrado
    const documentoExistente =
      (await Usuario.findOne({
        where: { Documento: DatosCrearEmpleados.Documento },
      })) ||
      (await Empleado.findOne({
        where: { Documento: DatosCrearEmpleados.Documento },
      })) ||
      (await Cliente.findOne({
        where: { Documento: DatosCrearEmpleados.Documento },
      }));

    if (documentoExistente) {
      return res
        .status(400)
        .json({ mensaje: "El documento ya está registrado en el sistema." });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    DatosCrearEmpleados.Contrasena = await bcrypt.hash(
      DatosCrearEmpleados.Contrasena,
      saltRounds
    );

    // Crea el empleado solo si el rol existe y las validaciones pasaron
    const empleadoCreado = await Empleado.create(DatosCrearEmpleados);

    // Recupera el empleado completo incluyendo los campos necesarios
    const empleadoCompleto = await Empleado.findByPk(
      empleadoCreado.IdEmpleado,
      {
        attributes: [
          "IdEmpleado",
          "Nombre",
          "Apellido",
          "Correo",
          "Telefono",
          "Estado",
          "IdRol",
          "Documento",
          "Tip_Documento", // Incluir el tipo de documento
          "Direccion",
        ],
      }
    );

    // Envía el empleado completo al cliente
    res.status(200).json(empleadoCompleto);
  } catch (error) {
    // Manejar el error de validación
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.log("Ocurrió un error al crear el empleado: ", error);
      res
        .status(500)
        .json({ mensaje: "Ocurrió un error al crear el empleado" });
    }
  }
}

async function ActualizarEmpleado(req, res) {
  try {
    const idEmpleado = parseInt(req.params.idEmpleado, 10);

    if (isNaN(idEmpleado)) {
      return res.status(400).json({ mensaje: "ID de empleado inválido" });
    }

    const datosActualizar = req.body;

    console.log("Datos a actualizar:", datosActualizar);

    if (!datosActualizar) {
      return res
        .status(400)
        .json({ mensaje: "No se proporcionaron datos para actualizar" });
    }

    const empleado = await Empleado.findByPk(idEmpleado);
    if (!empleado) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" });
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

      if (correoExistente && correoExistente.IdEmpleado !== idEmpleado) {
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

      if (documentoExistente && documentoExistente.IdEmpleado !== idEmpleado) {
        return res
          .status(400)
          .json({ mensaje: "El documento ya está registrado en el sistema." });
      }
    }

    // Actualizar el empleado con los nuevos datos
    await empleado.update(datosActualizar);

    const empleadoActualizado = await Empleado.findByPk(idEmpleado, {
      attributes: [
        "IdEmpleado",
        "Nombre",
        "Apellido",
        "Correo",
        "Telefono",
        "Estado",
        "IdRol",
        "Documento",
        "Tip_Documento", // Incluir el tipo de documento
        "Direccion",
      ],
    });

    return res.status(200).json(empleadoActualizado);
  } catch (error) {
    console.error("Ocurrió un error al actualizar el empleado:", error);

    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      return res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      return res
        .status(500)
        .json({ mensaje: "Ocurrió un error al actualizar el empleado" });
    }
  }
}

async function cambiarEstadoEmpleado(idEmpleado, nuevoEstado) {
  try {
    const empleados = await empleado.findByPk(idEmpleado);
    if (!empleados) {
      throw new Error("Empleado no encontrado");
    }

    empleados.Estado = nuevoEstado;
    await empleados.save();

    return empleados.id;
  } catch (error) {
    console.error("Ocurrió un error al cambiar el estado del empleado:", error);
    throw error;
  }
}

module.exports = {
  Listar_Empleados,
  CrearEmpleados,
  ActualizarEmpleado,
  cambiarEstadoEmpleado,
};
