const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Empleado = require("../../Models/empleados");
const Usuario = require("../../Models/usuarios");
const Cliente = require("../../Models/clientes");
const Rol = require("../../Models/roles");

// Configuración de nodemailer para el envío de correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Eduardomosquera12346@gmail.com',
    pass: 'exnl cumb oeme cudy' // Asegúrate de que esta contraseña sea segura o utiliza variables de entorno
  }
});

async function CrearEmpleados(req, res) {
  try {

    console.log("Datos recibidos en el backend:", req.body);

    console.log("Archivo recibido en el backend:", req.file);

    const datosCrearEmpleados = req.body;

    const Img = req.file ? `/uploads/Empleados/${req.file.filename}` : null;
    if (Img) {
      datosCrearEmpleados.Img = Img;
    }

    if (!datosCrearEmpleados.Correo) {
      console.log("El campo Correo está vacío o no existe.");
      return res.status(400).json({ mensaje: "El campo Correo es obligatorio" });
    }
    if (!datosCrearEmpleados.Estado) {
      console.log("El campo Estado está vacío o no existe. Estableciendo valor predeterminado en 1.");
      datosCrearEmpleados.Estado = 1; 
    }
    if (!datosCrearEmpleados.IdRol) {
      console.log("El campo IdRol está vacío o no existe.");
      return res.status(400).json({ mensaje: "El campo IdRol es obligatorio" });
    }

    // Verificar si el rol especificado existe en la tabla de roles
    const rolExistente = await Rol.findByPk(datosCrearEmpleados.IdRol);
    if (!rolExistente) {
      console.log("El rol especificado no existe.");
      return res.status(400).json({ mensaje: "El rol especificado no existe" });
    }

    // Verificar si el correo ya está registrado
    const correoExistente = await Usuario.findOne({
      where: { Correo: datosCrearEmpleados.Correo },
    }) || await Empleado.findOne({
      where: { Correo: datosCrearEmpleados.Correo },
    }) || await Cliente.findOne({
      where: { Correo: datosCrearEmpleados.Correo },
    });

    if (correoExistente) {
      console.log("El correo ya está registrado en el sistema.");
      return res.status(400).json({ mensaje: "El correo ya está registrado en el sistema." });
    }

    // Verificar si el documento ya está registrado
    const documentoExistente = await Usuario.findOne({
      where: { Documento: datosCrearEmpleados.Documento },
    }) || await Empleado.findOne({
      where: { Documento: datosCrearEmpleados.Documento },
    }) || await Cliente.findOne({
      where: { Documento: datosCrearEmpleados.Documento },
    });

    if (documentoExistente) {
      console.log("El documento ya está registrado en el sistema.");
      return res.status(400).json({ mensaje: "El documento ya está registrado en el sistema." });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    datosCrearEmpleados.Contrasena = await bcrypt.hash(
      datosCrearEmpleados.Contrasena,
      saltRounds
    );

    // Crear el empleado con el código de verificación
    const nuevoEmpleado = await Empleado.create({
      ...datosCrearEmpleados,
    });

    console.log("Empleado creado exitosamente:", nuevoEmpleado);
    return res.status(200).json(nuevoEmpleado);

  } catch (error) {
    console.error("Ocurrió un error al crear el empleado:", error);
    // Manejar el error de validación
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.error("Ocurrió un error al crear el empleado:", error);
      res.status(500).json({ mensaje: "Ocurrió un error al crear el empleado" });
    }
  }
}

module.exports = { CrearEmpleados };
