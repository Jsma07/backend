const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Empleado = require("../../Models/empleados");
const Usuario = require("../../Models/usuarios");
const Cliente = require("../../Models/clientes");
const Rol = require("../../Models/roles");
const fs = require('fs');
const path = require('path');

async function EditarEmpleado(req, res) {
  try {
    const { id } = req.params; // ID del empleado a editar
    const datosActualizar = req.body;

    console.log("Datos recibidos para actualización:", datosActualizar);

    // Buscar al empleado por ID
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      console.log("Empleado no encontrado con ID:", id);
      return res.status(404).json({ mensaje: "Empleado no encontrado." });
    }

    // Si se proporciona una nueva imagen
    if (req.file && req.file.path) {
      // Eliminar la imagen antigua si existe
      if (empleado.Img) {
        // Ruta del archivo antiguo
        const imagenAntiguaPath = path.join(__dirname, '../../uploads/empleados', empleado.Img);
        if (fs.existsSync(imagenAntiguaPath)) {
          fs.unlinkSync(imagenAntiguaPath);
        }
      }
      // Guardar la nueva ruta relativa
      datosActualizar.Img = path.join('uploads/empleados', req.file.filename); // Guarda solo la ruta relativa
    }

    // Verificar que el rol especificado, si se incluye, exista en la tabla de roles
    if (datosActualizar.IdRol) {
      const rolExistente = await Rol.findByPk(datosActualizar.IdRol);
      if (!rolExistente) {
        console.log("El rol especificado no existe:", datosActualizar.IdRol);
        return res.status(400).json({ mensaje: "El rol especificado no existe" });
      }
    }

    // Verificar si el correo está cambiando y si ya está registrado
    if (datosActualizar.Correo && datosActualizar.Correo !== empleado.Correo) {
      const correoExistente = await Usuario.findOne({
        where: { Correo: datosActualizar.Correo },
      }) || await Empleado.findOne({
        where: { Correo: datosActualizar.Correo },
      }) || await Cliente.findOne({
        where: { Correo: datosActualizar.Correo },
      });

      if (correoExistente) {
        console.log("El correo ya está registrado:", datosActualizar.Correo);
        return res.status(400).json({ mensaje: "El correo ya está registrado en el sistema." });
      }
    }

    // Verificar si el documento está cambiando y si ya está registrado
    if (datosActualizar.Documento && datosActualizar.Documento !== empleado.Documento) {
      const documentoExistente = await Usuario.findOne({
        where: { Documento: datosActualizar.Documento },
      }) || await Empleado.findOne({
        where: { Documento: datosActualizar.Documento },
      }) || await Cliente.findOne({
        where: { Documento: datosActualizar.Documento },
      });

      if (documentoExistente) {
        console.log("El documento ya está registrado:", datosActualizar.Documento);
        return res.status(400).json({ mensaje: "El documento ya está registrado en el sistema." });
      }
    }

    // Si la contraseña está siendo actualizada, encriptarla
    if (datosActualizar.Contrasena) {
      const saltRounds = 10;
      datosActualizar.Contrasena = await bcrypt.hash(
        datosActualizar.Contrasena,
        saltRounds
      );
    }

    // Actualizar solo los campos que han cambiado
    await empleado.update(datosActualizar);

    console.log("Empleado actualizado exitosamente:", empleado);
    return res.status(200).json(empleado);

  } catch (error) {
    console.error("Ocurrió un error al actualizar el empleado:", error);
    // Manejar el error de validación
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.error("Ocurrió un error al actualizar el empleado:", error);
      res.status(500).json({ mensaje: "Ocurrió un error al actualizar el empleado" });
    }
  }
}

module.exports = { EditarEmpleado };
