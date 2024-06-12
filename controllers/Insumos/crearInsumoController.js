const Insumo = require('../../models/insumos');
const Categoria = require('../../models/categorias'); 

exports.guardarInsumo = async (req, res) => {
    console.log('Controlador guardar alcanzado'); 
    try {
      const { Imagen, NombreInsumos, Cantidad, usos_unitarios, UsosDisponibles, PrecioUnitario, Estado, IdCategoria } = req.body;
  
      // Verificar si el nombre del insumo ya está registrado
      const existingInsumo = await Insumo.findOne({ where: { NombreInsumos } });
      if (existingInsumo) {
        return res.status(400).json({ error: 'El nombre del insumo ya está registrado.' });
      }
      
      // Si todo está bien, proceder a guardar el insumo
      const nuevoInsumo = await Insumo.create({
        Imagen,
        NombreInsumos,
        Cantidad,
        usos_unitarios,
        PrecioUnitario,
        UsosDisponibles,
        Estado: 'Disponible',
        IdCategoria
      });
  
      res.status(200).json({ Estado: 'guardado correctamente', insumo: nuevoInsumo });
  
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        // Manejo de errores de validación de Sequelize
        const errores = error.errors.map(err => err.message);
        return res.status(400).json({ errores });
      } else {
        console.error("Error al guardar el insumo", error);
        res.status(500).json({ error: 'Error al guardar el insumo' });
      }
    }
  };
  
  