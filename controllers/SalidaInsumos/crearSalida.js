const Insumo = require("../../Models/insumos");
const Salida = require("../../Models/Salida");

const crearSalida = async (req, res) => {
  try {
    const salidas = Array.isArray(req.body) ? req.body : [req.body]; // Convertir a arreglo si no lo es

    const resultados = [];
    for (const salida of salidas) {
      const { Idinsumos, Cantidad, Fecha_salida, Descripcion, Estado } = salida;

      // Validar que el insumo exista
      const insumo = await Insumo.findByPk(Idinsumos);
      if (!insumo) {
        return res
          .status(404)
          .json({ mensaje: `Insumo con ID ${Idinsumos} no encontrado` });
      }

      // Validar el estado
      const estadosValidos = ["Anulado", "Terminado"];
      if (!estadosValidos.includes(Estado)) {
        return res
          .status(400)
          .json({ mensaje: 'El estado debe ser "Anulado" o "Terminado"' });
      }

      // Crear una nueva salida
      const nuevaSalida = await Salida.create({
        Idinsumos,
        Cantidad,
        Fecha_salida,
        Descripcion,
        Estado,
      });

      resultados.push(nuevaSalida);
    }

    res.status(201).json(resultados);
  } catch (error) {
    console.error("Error al crear salidas:", error);
    res.status(500).json({ mensaje: "Error al crear salidas" });
  }
};

module.exports = {
  crearSalida,
};
