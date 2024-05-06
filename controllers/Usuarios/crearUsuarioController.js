const Usuario = require("../../models/usuarios")

exports.crearUsuario = async (req, res) => {
    console.log('Controlador crearUsuario alcanzado');
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { nombre, apellido, correo, telefono, rolId, contrasena } = req.body;
        console.log('Datos del cuerpo de la solicitud:', req.body);

        // Utiliza el método create del modelo Usuario para crear un nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            correo,
            telefono,
            rolId,
            contrasena,
            estado: 1 // Establece el estado como 1 al crear un nuevo usuario
        });
        console.log('Nuevo usuario creado:', nuevoUsuario);

        // Responde con el nuevo usuario creado
        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.log('Error al crear usuario', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
