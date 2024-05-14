const Servicio = require('../../../Models/servicios');

exports.crearServicio = async (req, res) => {
    console.log('Controlador crearServicio alcanzado');
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, ImgServicio, EstadoServicio } = req.body;
        console.log('Datos del cuerpo de la solicitud', req.body);

        // Utiliza el método create del modelo de Servicios para crear un nuevo registro en la base de datos
        const nuevoServicio = await Servicio.create({
            Nombre_Servicio,
            Precio_Servicio,
            Tiempo_Servicio,
            ImgServicio,
            EstadoServicio: 1 // Establece el estado como "1" al crearlo.
        });
        console.log('Nuevo servicio: ', nuevoServicio);

        // Responde con el nuevo Servicio Creado
        res.status(201).json({ mensaje: 'Servicio creado correctamente', servicio: nuevoServicio });
    } catch (error) {
        console.log('Error al crear servicio:', error);
        res.status(500).json({ error: 'Error interno del servicio' });
    }
};
