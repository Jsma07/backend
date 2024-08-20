const { error } = require('console');
const Servicio = require('../../Models/servicios');
const path = require('path');
const fs = require('fs');

// Definir el tamaño máximo permitido en bytes (1 MB en este caso)
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1

exports.guardarServicio = async (req, res) => {
    try {
      console.log("Body:", req.body);
      console.log("File:", req.file);
  
      const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, EstadoServicio, Descripcion_Servicio } = req.body;
      const ImgServicio = req.file ? `/uploads/${req.file.filename}` : null;
  
      // Verificar el tamaño del archivo
      if (req.file && req.file.size > MAX_FILE_SIZE) {
          // Eliminar el archivo subido
          fs.unlinkSync(req.file.path);
          return res.status(400).json({ error: 'El tamaño del archivo excede el límite permitido (1 MB).' });
      }
  
      // Verificar si el nombre del servicio ya está registrado
      const existingServicio = await Servicio.findOne({ where: { Nombre_Servicio } });
      if (existingServicio) {
          return res.status(400).json({ error: 'El nombre del servicio ya está registrado.' });
      }
  
      // Guardar el nuevo servicio
      const nuevoServicio = await Servicio.create({
          ImgServicio,
          Nombre_Servicio,
          Precio_Servicio,
          Tiempo_Servicio,
          EstadoServicio,
          Descripcion_Servicio	
      });
  
      res.status(200).json({ Estado: 'guardado correctamente', servicio: nuevoServicio });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
          const errores = error.errors.map(err => err.message);
          return res.status(400).json({ errores });
      } else {
          console.error("Error al guardar el servicio", error);
          res.status(500).json({ error: 'Error al guardar el servicio' });
      }
    }
  };
  