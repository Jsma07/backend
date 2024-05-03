const Usuario = require('../../models/usuarios'); // Importa el modelo de usuario

exports.crearUsuario = async (req, res) => {
    console.log('Controlador crearUsuario alcanzado');
    try {
        let { nombreUsuario, apellidoUsuario, correo, telefono, rolId, contrasena } = req.body;
        // Utiliza el método create del modelo Usuario para crear un nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombreUsuario,
            apellidoUsuario,
            correo,
            telefono,
            contrasena,
            rolId,
            
            estado: 1 // Establece el estado como 1 al crear un nuevo usuario
        });
        console.log(req.body)

        // Responde con el nuevo usuario creado
        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.log('Error al crear usuario', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
