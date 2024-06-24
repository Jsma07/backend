const Servicio = require('../../Models/servicios');
const { Op, json } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

// Tamaño maximo permitido en bytes 1 MB
const MAX_FILE_SIZE = 20000 *2000;

exports.editarServicio = async (req, res) => {
    try {
        const { IdServicio } = req.params;
        const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, EstadoServicio } = req.body;
        const newImgPath = req.file ? `/uploads/${req.file.filename}` : null;  // Construir una nueva ruta para la imagen si es una nueva

       // Buscamos el servicio por ID.
       const servicio = await Servicio.findByPk(IdServicio);
       if(!servicio){
        if(newImgPath){
            // Elinar la nueva imagen cargada ya que el servucio no existe
            fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({error: 'Servicio no encontrado'})
       }

       // Verificar si el nombre del servuio ya esta resgistrado o exixte en la base de datos
       if(Nombre_Servicio){
        const extingServicio = await Servicio.findOne({
            where:{
                Nombre_Servicio,
                IdServicio:{[Op.ne]: IdServicio}
            }
        });

        if (extingServicio) {
            if (newImgPath){
                // Elimina la imagen cargada ya que el nombre ya esta registrado
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({error: 'El nombre del Servicio ya esta regstristrado para otro ID.'})
        }
       } 
       
       // Eliminacion de la imagen anterior si se ha subido una nueva imagen.
       if(newImgPath && servicio.ImgServicio){
        const oldImgPath = path.join(__dirname, '../../', servicio.ImgServicio)
        fs.unlinkSync(oldImgPath);
       }

       // Verificar el tamano de la imagen
       if(req.file && req.file.size > MAX_FILE_SIZE){
        //Eliminacion del archivo si su tamaño excede el permitido
        fs.unlinkSync(req.file.path);
        return res.status(400).json({error: 'El tamaño de la imagen excede elimite permitido (1 MB).'});
       }

       // Actualizacion de los campos proporcionados
       await servicio.update({
        Nombre_Servicio: Nombre_Servicio ?? servicio.Nombre_Servicio,
        Precio_Servicio: Precio_Servicio ?? servicio.Precio_Servicio,
        Tiempo_Servicio: Tiempo_Servicio ?? servicio.Tiempo_Servicio,
        ImgServicio: newImgPath ?? servicio.ImgServicio, // Usar la nueva imagen si se sube, de lo contraraio mantiene la imagen antigua.
        EstadoServicio: EstadoServicio ?? servicio.EstadoServicio
       });

       res.status(200).json({ mensaje: 'Servicio actualizado correctamente', servicio})
    }catch (error){
        if (error.name === 'SequelizeValidationError'){
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores});
        }else {
            console.error("Error al editar el servicio", error);
            res.status(500).json({error: 'Error al editar el servicio'})
        }
    }
};