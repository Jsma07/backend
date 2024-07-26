
const Adiciones = require('../../Models/adiciones');


const listarAdiciones = async (req, res) => {
    try {
      const adiciones = await Adiciones.findAll();
      res.status(200).json(adiciones);
    } catch (error) {
      console.error('Error al obtener las adiciones:', error);
      res.status(500).json({ mensaje: 'Error al obtener las adiciones', error: error.message });
    }
  };
  
  const cambiarEstadoAdicion = async (req, res) => {
    try {
      const { id } = req.params; // Assuming you pass the IdAdiciones as a route parameter
  
      const [updatedRows] = await Adiciones.update(
        { Estado: req.body.Estado },
        { where: { IdAdiciones: id } }
      );
  
      if (updatedRows > 0) {
        res.status(200).json({ mensaje: 'Estado de la adición actualizado correctamente' });
      } else {
        res.status(404).json({ mensaje: 'No se encontró la adición para actualizar' });
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la adición:', error);
      res.status(500).json({ mensaje: 'Error al cambiar el estado de la adición', error: error.message });
    }
  };
  
  module.exports = {
    
    listarAdiciones,
    cambiarEstadoAdicion
  };
  