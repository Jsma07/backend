const Adiciones = require("../../Models/adiciones");

const listarAdiciones = async (req, res) => {
  try {
    const adiciones = await Adiciones.findAll();
    res.status(200).json(adiciones);
  } catch (error) {
    console.error("Error al obtener las adiciones:", error);
    res.status(500).json({
      mensaje: "Error al obtener las adiciones",
      error: error.message,
    });
  }
};
const cambiarEstadoAdicion = async (req, res) => {
  try {
    const { id } = req.params; // ID de la adición desde la URL
    const { Estado } = req.body; // Estado nuevo desde el cuerpo de la solicitud

    console.log("ID:", id); // Depurar: Verificar el valor de ID
    console.log("Estado:", Estado); // Depurar: Verificar el valor de Estado

    // Verificar que el Estado sea un número y uno de los valores válidos
    if (![1, 2].includes(Number(Estado))) {
      return res.status(400).json({ mensaje: "Estado inválido" });
    }

    // Actualizar el estado de la adición
    const [updatedRows] = await Adiciones.update(
      { Estado: Number(Estado) },
      { where: { IdAdiciones: id } }
    );

    if (updatedRows > 0) {
      res
        .status(200)
        .json({ mensaje: "Estado de la adición actualizado correctamente" });
    } else {
      res
        .status(404)
        .json({ mensaje: "No se encontró la adición para actualizar" });
    }
  } catch (error) {
    console.error("Error al cambiar el estado de la adición:", error);
    res.status(500).json({
      mensaje: "Error al cambiar el estado de la adición",
      error: error.message,
    });
  }
};

module.exports = {
  listarAdiciones,
  cambiarEstadoAdicion,
};
