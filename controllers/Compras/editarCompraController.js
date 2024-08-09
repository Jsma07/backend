const Compras  = require('../../Models/compras');

const editarEstadoCompra = async (req, res) => {
    const { IdCompra } = req.params;
    const { estado_compra } = req.body;
  
    try {
      const compra = await Compras.findByPk(IdCompra);
      console.log(compra); 
  
      if (!compra) {
        return res.status(404).json({ error: 'Compra no encontrada' });
      }
 s 
      compra.estado_compra = estado_compra;
      await compra.save();
  
      return res.status(200).json({ message: 'Estado de la compra actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el estado de la compra:', error);
      return res.status(500).json({ error: 'Error al actualizar el estado de la compra' });
    }
  };
  
  module.exports = {
    editarEstadoCompra,
  };