const Usuario = require('../../Models/usuarios');
const bcrypt = require('bcrypt');

exports.editarUsuario = async(req, res)=>{
    try {
        const {id} = req.params;
        const {nombre, apellido, correo, telefono, rolId, estado,Documento,tipoDocumento } = req.body;

        const usuarioActualizado = await Usuario.update(
            {nombre, apellido, correo, telefono, rolId, estado, Documento, tipoDocumento},
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

        const contrasenaCifrada = await bcrypt.hash(newPassword, 10);

        const usuarioActualizado = await Usuario.update(
            { contrasena: contrasenaCifrada },
            { where: { id } }
        );

        res.status(200).json({ mensaje: 'Contraseña actualizada correctamente', usuario: usuarioActualizado });
    } catch (error) {
        console.error("Error al cambiar la contraseña del usuario:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};