const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Cliente = require("../../Models/clientes");
const Usuario = require("../../Models/usuarios");
const Empleado = require("../../Models/empleados");


// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Eduardomosquera12346@gmail.com',
    pass: 'hgmh kizr khrq jcvb'
  },
  logger: true, 
  debug: true   
});

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
      return res.status(400).json({ mensaje: "El correo ya está registrado en el sistema." });
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
      return res.status(400).json({ mensaje: "El documento ya está registrado en el sistema." });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    datosCrearClientes.Contrasena = await bcrypt.hash(
      datosCrearClientes.Contrasena,
      saltRounds
    );

    // Manejar la imagen
    const Img = req.file ? `/uploads/clientes/${req.file.filename}` : null;
    if (Img) {
      datosCrearClientes.Img = Img;
    }

    // Generar un código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Crear el cliente con el código de verificación
    const nuevoCliente = await Cliente.create({
      ...datosCrearClientes,
      CodigoVerificacion: verificationCode,
      FechaInicio: new Date(),
      Verificado: false,
    });

    const mailOptions = {
      from: 'tu-email@gmail.com', 
      to: datosCrearClientes.Correo,
      subject: 'Código de Verificación',
      html: `
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 2px solid #e0e0e0;
            }
            .header img {
              max-width: 150px;
            }
            .content {
              text-align: center;
              padding: 20px;
            }
            .content h1 {
              color: #333333;
            }
            .content p {
              color: #555555;
              line-height: 1.5;
            }
            .button {
              display: inline-block;
              padding: 15px 25px;
              font-size: 16px;
              color: #ffffff;
              background-color: #e83e8c;
              border-radius: 5px;
              text-decoration: none;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              padding: 10px;
              font-size: 14px;
              color: #777777;
              border-top: 2px solid #e0e0e0;
            }
            .footer a {
              color: #e83e8c;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="http://localhost:3000/jacke.png" alt="Logo">
            </div>
            <div class="content">
              <h1>¡Hola ${datosCrearClientes.Nombre}!</h1>
              <p>Gracias por registrarte con nosotros. Para completar el proceso, por favor, utiliza el siguiente código de verificación:</p>
              <h2>${verificationCode}</h2>
              <p>Este código expira en 30 minutos.</p>
              <a href="http://localhost:3000/Verificacion" class="button">Verificar mi cuenta</a>
            </div>
            <div class="footer">
              <p>Si tienes problemas con el botón de verificación, copia y pega el siguiente enlace en tu navegador:</p>
              <p><a href="http://localhost:3000/Verificacion">http://localhost:3000/Verificacion</a></p>
              <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
        return res.status(500).json({ mensaje: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado:', info.response);
        return res.status(200).json(nuevoCliente);
      }
    });

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
    const datosActualizarCliente = req.body;
    const clienteId = req.params.id; // Suponiendo que el ID del cliente se pasa como un parámetro en la URL

    // Verifica si el cliente existe
    const clienteExistente = await Cliente.findByPk(clienteId);

    if (!clienteExistente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado." });
    }

    // Verifica si el correo ya está registrado (excepto el del cliente actual)
    const correoExistente = await Cliente.findOne({
      where: { Correo: datosActualizarCliente.Correo, IdCliente: { [Op.ne]: clienteId } }
    });

    if (correoExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado en el sistema." });
    }

    // Verifica si el documento ya está registrado (excepto el del cliente actual)
    const documentoExistente = await Cliente.findOne({
      where: { Documento: datosActualizarCliente.Documento, IdCliente: { [Op.ne]: clienteId } }
    });

    if (documentoExistente) {
      return res.status(400).json({ mensaje: "El documento ya está registrado en el sistema." });
    }

    // Maneja la imagen (si se ha subido una nueva)
    let Img = clienteExistente.Img; // Mantén la imagen existente si no hay nueva

    if (req.file) {
      Img = `/uploads/clientes/${req.file.filename}`;
    }

    // Actualiza el cliente con los nuevos datos
    const clienteActualizado = await Cliente.update({
      ...datosActualizarCliente,
      Img: Img
    }, {
      where: { IdCliente: clienteId },
      returning: true, // Para obtener el registro actualizado
      plain: true
    });

    if (clienteActualizado[0] === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado para actualizar." });
    }

    // Obtén el cliente actualizado
    const cliente = clienteActualizado[1];

    // Configura las opciones del correo
    const mailOptions = {
      from: 'tu-email@gmail.com',
      to: cliente.Correo,
      subject: 'Actualización de Datos',
      html: `
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 2px solid #e0e0e0;
            }
            .header img {
              max-width: 150px;
            }
            .content {
              text-align: center;
              padding: 20px;
            }
            .content h1 {
              color: #333333;
            }
            .content p {
              color: #555555;
              line-height: 1.5;
            }
            .footer {
              text-align: center;
              padding: 10px;
              font-size: 14px;
              color: #777777;
              border-top: 2px solid #e0e0e0;
            }
            .footer a {
              color: #e83e8c;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="http://localhost:3000/jacke.png" alt="Logo">
            </div>
            <div class="content">
              <h1>¡Hola ${cliente.Nombre}!</h1>
              <p>Tus datos han sido actualizados con éxito en nuestro sistema.</p>
            </div>
            <div class="footer">
              <p>Si tienes problemas con los datos actualizados, por favor, contacta con nuestro soporte.</p>
              <p>&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
        return res.status(500).json({ mensaje: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado:', info.response);
        return res.status(200).json(cliente);
      }
    });

  } catch (error) {
    // Maneja el error de validación
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => ({
        campo: err.path,
        mensaje: err.message,
      }));
      res.status(400).json({ mensaje: "Error de validación", errores });
    } else {
      console.log("Ocurrió un error al actualizar el cliente:", error);
      res.status(500).json({ mensaje: "Ocurrió un error al actualizar el cliente" });
    }
  }
}







module.exports = {
  Crearclientes,
  ActualizarCliente
};
