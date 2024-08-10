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
    const empleado = await Empleado.findOne({ where: { Correo: correo } });
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

    // Accede a las propiedades a través de dataValues
    const userData = user.dataValues;
    console.log('Usuario encontrado:', userData); // Agregado para depuración

    let contrasenaValida;
    if (tipoUsuario === 'usuario') {
      if (userData.estado !== 1) {
        return res.status(403).json({ mensaje: 'Usuario no está activo' });
      }
      contrasenaValida = await bcrypt.compare(contrasena, userData.Contrasena);
    } else if (tipoUsuario === 'empleado') {
      if (userData.Estado !== 1) {
        return res.status(403).json({ mensaje: 'Usuario no está activo' });
      }
      console.log('Contraseña para comparar:', contrasena); // Agregado para depuración
      console.log('Contraseña almacenada:', userData.Contrasena); // Agregado para depuración
      contrasenaValida = await bcrypt.compare(contrasena.trim(), userData.Contrasena);
    } else if (tipoUsuario === 'cliente') {
      if (userData.Estado !== 1) {
        return res.status(403).json({ mensaje: 'Usuario no está activo' });
      }
      contrasenaValida = await bcrypt.compare(contrasena, userData.Contrasena);
    }

    console.log('Contraseña válida:', contrasenaValida); // Agregado para depuración

    if (!contrasenaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { 
        id: userData.id || userData.IdEmpleado || userData.IdCliente, 
        correo: userData.correo || userData.Correo, 
        rolId: userData.rolId || userData.IdRol 
      },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.json({
      token,
      user: {
        id: userData.id || userData.IdEmpleado || userData.IdCliente,
        nombre: userData.nombre || userData.Nombre,
        apellido: userData.apellido || userData.Apellido,
        correo: userData.correo || userData.Correo,
        rolId: userData.rolId || userData.IdRol
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
