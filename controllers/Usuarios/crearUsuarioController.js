const Usuario = require('../../Models/usuarios'); //Importa el modelo de usuario
const bcrypt = require('bcrypt');
const Empleados = require('../../Models/empleados')
const Clientes = require('../../Models/clientes')
const { DatosFormateados } = require('./formateoValidaciones');
const {CorreoFormateado} = require('./formateoValidaciones')
const {NumerosFormateados} = require('./formateoValidaciones')


exports.crearUsuario = async (req, res) => {
    console.log('Controlador crearUsuario alcanzado');
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { nombre, apellido, correo, telefono, rolId, contrasena,Documento, tipoDocumento, estado } = req.body;
        console.log('Datos del cuerpo de la solicitud:', req.body);
        const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

      nombre = DatosFormateados(nombre)
      apellido = DatosFormateados(apellido)
      correo = CorreoFormateado(correo)
      telefono = NumerosFormateados(telefono)
      Documento = NumerosFormateados(Documento)

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