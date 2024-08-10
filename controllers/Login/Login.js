const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../../Models/usuarios');
const Empleado = require('../../Models/empleados');
const Cliente = require('../../Models/clientes');

const Login = async (req, res) => {
  const { correo, contrasena } = req.body;
  //correo = correo.trim()
  try {
    // Verificar si el usuario es un usuario, empleado o cliente
    const usuario = await Usuario.findOne({ where: { correo } });
    const empleado = await Empleado.findOne({ where: { correo } });
    const cliente = await Cliente.findOne({ where: { correo } });

    let user = null;
    let tipoUsuario = '';

    if (usuario) {
      user = usuario;
      tipoUsuario = 'usuario';
    } else if (empleado) {
      user = empleado;
      tipoUsuario = 'empleado';
    } else if (cliente) {
      user = cliente;
      tipoUsuario = 'cliente';
    }

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (user.estado != 1) {
      return res.status(403).json({ mensaje: 'Usuario no está activo' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, user.contrasena || user.Contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id || user.IdEmpleado || user.IdCliente, correo: user.correo || user.Correo, rolId: user.rolId || user.IdRol },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.json({
      token,
      user: {
        id: user.id || user.IdEmpleado || user.IdCliente,
        nombre: user.nombre || user.Nombre,
        apellido: user.apellido || user.Apellido,
        correo: user.correo || user.Correo,
        rolId: user.rolId || user.IdRol
      }
    });

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
}

module.exports = {
  Login
};
