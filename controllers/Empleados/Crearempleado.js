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
    const datosCrearEmpleados = req.body;

    // Verificar si el rol especificado existe en la tabla de roles
    const rolExistente = await Rol.findByPk(datosCrearEmpleados.IdRol);
    if (!rolExistente) {
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
      return res.status(400).json({ mensaje: "El documento ya está registrado en el sistema." });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    datosCrearEmpleados.Contrasena = await bcrypt.hash(
      datosCrearEmpleados.Contrasena,
      saltRounds
    );

    // Obtener la información de la imagen (si se ha subido)
    const imagen = req.file ? `/uploads/empleados/${req.file.filename}` : null;

    // Generar un código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Crear el empleado con el código de verificación
    const nuevoEmpleado = await Empleado.create({
      ...datosCrearEmpleados,
      CodigoVerificacion: verificationCode,
      FechaInicio: new Date(),
      Verificado: false,
      Img: imagen, // Guardar la ruta de la imagen en la base de datos
    });

    // // Configurar el correo de verificación
    // const mailOptions = {
    //   from: 'Eduardomosquera12346@gmail.com',
    //   to: datosCrearEmpleados.Correo,
    //   subject: 'Código de Verificación',
    //   html: `
    //     <html>
    //     <head>
    //       <style>
    //         /* Estilos del correo */
    //       </style>
    //     </head>
    //     <body>
    //       <div class="container">
    //         <div class="header">
    //           <img src="http://localhost:3000/jacke.png" alt="Logo">
    //         </div>
    //         <div class="content">
    //           <h1>¡Hola ${datosCrearEmpleados.Nombre}!</h1>
    //           <p>Gracias por registrarte con nosotros. Para completar el proceso, por favor, utiliza el siguiente código de verificación:</p>
    //           <h2>${verificationCode}</h2>
    //           <p>Este código expira en 30 minutos.</p>
    //           <a href="http://localhost:3000/Verificacion" class="button">Verificar mi cuenta</a>
    //         </div>
    //         <div class="footer">
    //           <p>Si tienes problemas con el botón de verificación, copia y pega el siguiente enlace en tu navegador:</p>
    //           <p><a href="http://localhost:3000/Verificacion">http://localhost:3000/Verificacion</a></p>
    //           <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
    //         </div>
    //       </div>
    //     </body>
    //     </html>
    //   `
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log('Error al enviar el correo:', error);
    //     return res.status(500).json({ mensaje: 'Error al enviar el correo' });
    //   } else {
    //     console.log('Correo enviado:', info.response);
    //     return res.status(200).json(nuevoEmpleado);
    //   }
    // });

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
      res.status(500).json({ mensaje: "Ocurrió un error al crear el empleado" });
    }
  }
}

module.exports = { CrearEmpleados };
