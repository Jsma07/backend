const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Cliente = require('../../Models/clientes'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');
const enviarCorreo = async (correo, codigo) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jakenailscol@gmail.com', // Reemplaza con tu email
      pass: 'xsmu nrlf fjqq nfrw' // Reemplaza con la contraseña de tu email
    }
  });

  // Asegúrate de que la ruta al archivo de plantilla sea correcta
  const templatePath = path.join(__dirname, '..', '..', 'templates', 'verification-code-template.html');
  const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
  const htmlContent = htmlTemplate
    .replace('{{codigo_1}}', codigo[0])
    .replace('{{codigo_2}}', codigo[1])
    .replace('{{codigo_3}}', codigo[2])
    .replace('{{codigo_4}}', codigo[3])
    .replace('{{codigo_5}}', codigo[4])
    .replace('{{codigo_6}}', codigo[5]);

  const mailOptions = {
    from: 'jakenailscol@gmail.com', 
    to: correo,
    subject: 'Código de Verificación Jake Nails',
    html: htmlContent
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
  const { correo } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { Correo: correo } });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Genera un código de verificación de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);
    console.log('Código de verificación generado:', codigo);

    // Guarda el código de verificación en la base de datos
    cliente.codigoContrasena = codigo;
    await cliente.save();

    // Envía el código por correo
    await enviarCorreo(correo, codigo.toString());
    res.json({ mensaje: 'Código de verificación enviado al correo' });
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError' && error.original.code === 'ER_LOCK_WAIT_TIMEOUT') {
      console.error('Error de tiempo de espera de bloqueo:', error);
      res.status(500).json({ mensaje: 'Error de tiempo de espera de bloqueo en la recuperación de contraseña. Por favor, inténtalo de nuevo más tarde.' });
    } else {
      console.error('Error en la recuperación de contraseña:', error);
      res.status(500).json({ mensaje: 'Error en la recuperación de contraseña' });
    }
  }
};

const verificarCodigo = async (req, res) => {
  const { correo, codigo } = req.body;

  if (!correo || !codigo) {
    return res.status(400).json({ mensaje: 'Correo y código son requeridos' });
  }

  try {
    const cliente = await Cliente.findOne({ where: { Correo: correo } });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const codigoRecibido = parseInt(codigo, 10);
    const codigoGuardado = cliente.codigoContrasena;

    console.log(`Código recibido (tipo: ${typeof codigoRecibido}): ${codigoRecibido}`);
    console.log(`Código guardado (tipo: ${typeof codigoGuardado}): ${codigoGuardado}`);

    if (codigoGuardado !== codigoRecibido) {
      return res.status(400).json({ mensaje: 'Código de verificación incorrecto' });
    }

    res.json({ mensaje: 'Código verificado correctamente' });
  } catch (error) {
    console.error('Error al verificar el código:', error);
    res.status(500).json({ mensaje: 'Error al verificar el código' });
  }
};

const actualizarContrasena = async (req, res) => {
  const { correo, nuevaContrasena } = req.body;

  if (!correo || !nuevaContrasena) {
    return res.status(400).json({ mensaje: 'Correo y nueva contraseña son requeridos' });
  }

  try {
    // Busca al cliente por correo
    const cliente = await Cliente.findOne({ where: { Correo: correo } });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Cifra la nueva contraseña
    const contrasenaCifrada = await bcrypt.hash(nuevaContrasena, 10);

    // Actualiza la contraseña en la base de datos
    cliente.Contrasena = contrasenaCifrada;
    cliente.codigoContrasena = null; // Limpia el código de verificación
    await cliente.save();

    res.json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la contraseña' });
  }
};

module.exports = { recuperarContrasena, verificarCodigo, actualizarContrasena };
