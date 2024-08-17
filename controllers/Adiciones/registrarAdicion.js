const Adiciones = require("../../Models/adiciones");
const path = require("path");
const fs = require("fs");

const MAX_FILE_SIZE = 20000 * 20000; // Ajusta el tamaño máximo según sea necesario

const registrarAdicion = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    console.log("Archivo recibido:", req.file);

    const { NombreAdiciones, Precio } = req.body;

    // Ruta donde se guardarán las imágenes
    const imgDirectory = path.join(__dirname, "../../uploads/Adiciones");

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(imgDirectory)) {
      fs.mkdirSync(imgDirectory, { recursive: true });
    }

    // Obtener la ruta de la imagen
    const Img = req.file ? `/uploads/Adiciones/${req.file.filename}` : null;

    // Verificar el tamaño del archivo
    if (req.file && req.file.size > MAX_FILE_SIZE) {
      // Eliminar el archivo subido si excede el tamaño permitido
      fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ error: "El tamaño del archivo excede el límite permitido." });
    }

    // Guardar la nueva adición en la base de datos
    const nuevaAdicion = await Adiciones.create({
      Img,
      NombreAdiciones,
      Precio,
      Estado: 1,
    });

    res.status(201).json({
      mensaje: "Adición registrada correctamente",
      adicion: nuevaAdicion,
    });
  } catch (error) {
    console.error("Error al registrar la adición:", error);
    res.status(500).json({
      mensaje: "Error al registrar la adición",
      error: error.message,
    });
  }
};

module.exports = {
  registrarAdicion,
};
