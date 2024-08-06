const Insumo = require("../../Models/insumos");
const Salida = require("../../Models/Salida");
const crearSalida = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // Log de los datos recibidos
    const salidas = Array.isArray(req.body) ? req.body : [req.body];

    const resultados = [];
    for (const salida of salidas) {
      const { Idinsumos, Cantidad, Fecha_salida, Descripcion, Estado } = salida;

      console.log("Procesando salida:", salida);

      // Validar que el insumo exista
      const insumo = await Insumo.findByPk(Idinsumos);
      if (!insumo) {
        console.log(`Insumo con ID ${Idinsumos} no encontrado`);
        return res
          .status(404)
          .json({ mensaje: `Insumo con ID ${Idinsumos} no encontrado` });
      }

      // Validar el estado
      const estadosValidos = ["Anulado", "Terminado"];
      if (!estadosValidos.includes(Estado)) {
        console.log(`Estado no válido: ${Estado}`);
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

      console.log("Salida creada:", nuevaSalida);

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
