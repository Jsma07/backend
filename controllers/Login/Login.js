const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Usuario = require('../../Models/usuarios')

const Login = async(req, res)=>{

    const {correo, contrasena} = req.body
    try{
        const usuario = await Usuario.findOne({
            where: {correo}
        })

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
          }

          const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

          if (!contrasenaValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
          }
          const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rolId: usuario.rolId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.status(200).json({ token });

    }catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }
}
module.exports = {
    Login
  };