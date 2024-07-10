const Usuario = require('../../Models/usuarios'); //Importa el modelo de usuario

exports.crearUsuario = async (req, res) => {
    console.log('Controlador crearUsuario alcanzado');
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { nombre, apellido, correo, telefono, rolId, contrasena,Documento, tipoDocumento } = req.body;
        console.log('Datos del cuerpo de la solicitud:', req.body);
        const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            correo,
            telefono,
            rolId,
            contrasena :contrasenaCifrada ,
            estado: 1,
            Documento,
            tipoDocumento
        });
        console.log('Nuevo usuario creado:', nuevoUsuario);

        // Responde con el nuevo usuario creado
        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.log('Error al crear usuario', error);
        res.status(500).json({ error: 'Hubo un error al crear el usuario. Por favor, inténtalo de nuevo más tarde.' });
    }
};
exports.verificarCorreo = async (req, res) => {
    try {
      console.log('Correo a verificar:', req.params.correo);
      const correoExiste = await Usuario.findOne({ where: { correo: req.params.correo } });
      console.log('Resultado de la consulta:', correoExiste);
      res.status(200).json({ existe: correoExiste !== null });
    } catch (error) {
      console.error('Error al verificar correo:', error);
      res.status(500).json({ error: 'Hubo un error al verificar el correo. Por favor, inténtalo de nuevo más tarde.' });
    }
};
