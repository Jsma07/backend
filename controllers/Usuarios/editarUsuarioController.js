const Usuario = require('../../models/usuarios');

exports.editarUsuario = async(req, res)=>{
    try {
        const {id} = req.params;
        const {nombre, apellido, correo, telefono, rolId, estado,Documento, } = req.body;

        const usuarioActualizado = await Usuario.update(
            {nombre, apellido, correo, telefono, rolId, estado, Documento},
            { where : {id} }

        );
        res.status(200).json({mensaje: 'Usuario actualizado correctamente', usuario: usuarioActualizado})
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor'})
    }
}
exports.actualizarContrasena = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        const usuarioActualizado = await Usuario.update(
            { contrasena: newPassword },
            { where: { id } }
        );

        res.status(200).json({ mensaje: 'Contraseña actualizada correctamente', usuario: usuarioActualizado });
    } catch (error) {
        console.error("Error al cambiar la contraseña del usuario:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};