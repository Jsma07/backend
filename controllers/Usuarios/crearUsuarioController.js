const mysql = require('mysql2/promise');
const Usuario = require('../../models/Usuarios/usuarioModel')

exports.crearUsuario = async (req, res)=> {
   try {
    let { nombreUsuario, apellidoUsuario, correo, telefono, rolId, contrasena, estado } = req.body;
    const nuevoUsuario = await Usuario.create({
        nombreUsuario,
        apellidoUsuario,
        correo,
        telefono,
        rolId,
        contrasena,
        estado
    })
    res.status(201).json({mensaje: 'usuario creado correctamente', usuario: nuevoUsuario})
   } catch (error) {
    console.log('Error al crear usuario', error)
    res.status(500).json({ error: 'Error interno del servidor' });

   }


}