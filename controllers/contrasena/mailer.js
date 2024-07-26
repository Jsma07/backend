const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Cliente = require('../../models/clientes');

// Función para generar una contraseña aleatoria
const generarContrasenaAleatoria = (longitud = 12) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let contrasena = '';
  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contrasena += caracteres[indice];
  }
  return contrasena;
};

// Función para cifrar y actualizar la contraseña
const actualizarContrasena = async (id, nuevaContrasena) => {
  const contrasenaCifrada = await bcrypt.hash(nuevaContrasena, 10);
  await Cliente.update({ contrasena: contrasenaCifrada }, { where: { IdCliente: id } }); // Asegúrate de usar el nombre correcto del campo IdCliente
};

// Función para enviar un correo con la nueva contraseña
const enviarCorreo = async (correo, nuevaContrasena) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'p42583532@gmail.com', // Reemplaza con tu email
      pass: 'Perez.M123' // Reemplaza con la contraseña de tu email
    }
  });

  const mailOptions = {
    from: 'p42583532@gmail.com',
    to: correo,
    subject: 'Recuperación de Contraseña',
    text: `Tu nueva contraseña es: ${nuevaContrasena}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
};

// Controlador para recuperar la contraseña
const recuperarContrasena = async (req, res) => {
  const { correo } = req.body; // Solo se necesita el correo

  console.log('Correo recibido:', correo);

  try {
    // Busca al cliente por correo
    const cliente = await Cliente.findOne({ where: { Correo: correo } }); // Asegúrate de usar el nombre correcto del campo Correo
    if (!cliente) {
      console.log('Cliente no encontrado');
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    console.log('Cliente encontrado:', cliente);

    // Genera una nueva contraseña
    const nuevaContrasena = generarContrasenaAleatoria();
    console.log('Nueva contraseña generada:', nuevaContrasena);

    // Actualiza la contraseña en la base de datos
    await actualizarContrasena(cliente.IdCliente, nuevaContrasena);
    console.log('Contraseña actualizada en la base de datos');

    // Envía la nueva contraseña por correo
    await enviarCorreo(correo, nuevaContrasena);
    console.log('Correo enviado con la nueva contraseña');

    res.json({ mensaje: 'Nueva contraseña enviada al correo' });
  } catch (error) {
    console.error('Error en la recuperación de contraseña:', error);
    res.status(500).json({ mensaje: 'Error en la recuperación de contraseña' });
  }
};

module.exports = { recuperarContrasena };
