const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Usuario = require('../../Models/usuarios'); // Asegúrate de que la ruta sea correcta

// Función para generar una contraseña aleatoria
const generarContrasenaAleatoria = (longitud = 12) => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  const especiales = '!@#$%^&*()_+[]{}|;:,.<>?';
  const minusculas = 'abcdefghijklmnopqrstuvwxyz';

  let contrasena = '';

  // Asegurar al menos una mayúscula, un número y un carácter especial
  contrasena += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  contrasena += numeros[Math.floor(Math.random() * numeros.length)];
  contrasena += especiales[Math.floor(Math.random() * especiales.length)];
  contrasena += minusculas[Math.floor(Math.random() * minusculas.length)];

  // Rellenar el resto de la contraseña
  for (let i = contrasena.length; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    contrasena += caracteres[indice];
  }

  // Mezclar la contraseña para evitar patrones predecibles
  contrasena = contrasena.split('').sort(() => 0.5 - Math.random()).join('');

  return contrasena;
};

// Función para cifrar y actualizar la contraseña
const actualizarContrasena = async (id, nuevaContrasena) => {
  try {
    const contrasenaCifrada = await bcrypt.hash(nuevaContrasena, 10);
    await Usuario.update({ contrasena: contrasenaCifrada }, { where: { id: id } });
    console.log('Contraseña cifrada y actualizada en la base de datos:', contrasenaCifrada);
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw new Error('Error al actualizar la contraseña');
  }
};

// Función para enviar un correo con la nueva contraseña
const enviarCorreo = async (correo, nuevaContrasena) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eduardomosquera12346@gmail.com', // Reemplaza con tu email
      pass: 'exnl cumb oeme cudy' // Reemplaza con la contraseña de tu email
    }
  });

  const mailOptions = {
    from: 'eduardomosquera12346@gmail.com', // Cambia esto por tu correo
    to: correo,
    subject: 'Recuperación de Contraseña Jake Nails',
    text: `Hola querid@ usuario de nuestro aplicativo Jake Nails, esta es tu nueva contraseña es: ${nuevaContrasena}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado a:', correo);
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
    // Busca al usuario por correo
    const usuario = await Usuario.findOne({ where: { correo: correo } });
    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', usuario);

    // Genera una nueva contraseña
    const nuevaContrasena = generarContrasenaAleatoria();
    console.log('Nueva contraseña generada:', nuevaContrasena);

    // Actualiza la contraseña en la base de datos
    await actualizarContrasena(usuario.id, nuevaContrasena);
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
