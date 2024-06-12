const Usuario = require('../../models/usuarios');

exports.editarUsuario = async(req, res)=>{
    try {
        const {id} = req.params;
        const {nombre, apellido, correo, telefono, rolId, contrasena, estado,Documento} = req.body;

        const usuarioActualizado = await Usuario.update(
            {nombre, apellido, correo, telefono, rolId, contrasena, estado, Documento},
            { where : {id} }

        );
        res.status(200).json({mensaje: 'Usuario actualizado correctamente', usuario: usuarioActualizado})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor'})
    }
}