const Usuario = require('../../Models/usuarios'); //Importa el modelo de usuario
const bcrypt = require('bcryptjs');
const Empleados = require('../../Models/empleados')
const Clientes = require('../../Models/clientes')
// const { DatosFormateados, CorreoFormateado, NumerosFormateados } = require('./formateoValidaciones');



exports.crearUsuario = async (req, res) => {
    console.log('Controlador crearUsuario alcanzado');
    try {
        // Extrae los datos del cuerpo de la solicitud
        
        let { nombre, apellido, correo, telefono, rolId, contrasena, Documento, tipoDocumento, estado } = req.body;

    // Formatea los datos
    nombre = nombre.trim().toLowerCase().charAt(0).toUpperCase() + nombre.trim().toLowerCase().slice(1);
    apellido = apellido.trim().toLowerCase().charAt(0).toUpperCase() + apellido.trim().toLowerCase().slice(1);
    correo = correo.trim().toLowerCase();
    telefono = telefono.trim();
    Documento = Documento.trim();
        const contrasenaCifrada = await bcrypt.hash(contrasena, 10);


        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            correo,
            telefono,
            rolId,
            contrasena :contrasenaCifrada ,
            estado,
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
    const { correo } = req.params;

    try {
        const admin = await Usuario.findOne({ where: { correo } });
        const empleado = await Empleados.findOne({ where: { correo } });
        const cliente = await Clientes.findOne({ where: { correo } });
    
        if (admin || empleado || cliente) {
          return res.status(400).json({ mensaje: 'El correo ya está registrado en el sistema.' });
        }
    
        res.status(200).json({ mensaje: 'El correo está disponible.' });
      } catch (error) {
        console.error('Error al verificar el correo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
      }
};
exports.verificarDocumento = async (req, res) => {
    const { documento } = req.params;

    try {
        const admin = await Usuario.findOne({ where: { documento } });
        const empleado = await Empleados.findOne({ where: { documento } });
        const cliente = await Clientes.findOne({ where: { documento } });
    
        if (admin || empleado || cliente) {
          return res.status(400).json({ mensaje: 'El documento ya está registrado en el sistema.' });
        }
    
        res.status(200).json({ mensaje: 'El documento está disponible.' });
      } catch (error) {
        console.error('Error al verificar el documento:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
      }
};