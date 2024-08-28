const Categoria = require("../../../Models/categorias");

const formatNombreCategoria = (nombre) => {
  const nombreSinEspacios = nombre.trim();
  const nombreMinusculas = nombreSinEspacios.toLowerCase();
  const nombreFormateado =
    nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);

  return nombreFormateado;
};

exports.guardarCategoria = async (req, res) => {
  console.log("Controlador guardarCategoria alcanzado");
  try {
    let { nombre_categoria, estado_categoria } = req.body;
    console.log("Datos recibidos:", { nombre_categoria, estado_categoria });

    nombre_categoria = formatNombreCategoria(nombre_categoria);
    console.log("Nombre formateado:", nombre_categoria);

    const existingCategoria = await Categoria.findOne({
      where: { nombre_categoria },
    });
    if (existingCategoria) {
      console.log(
        "El nombre de la categoría ya está registrado:",
        nombre_categoria
      );
      return res
        .status(400)
        .json({ error: "El nombre de la categoría ya está registrado." });
    }

    const nuevaCategoria = await Categoria.create({
      nombre_categoria,
      estado_categoria,
    });

    console.log("Nueva categoría creada:", nuevaCategoria);

    res
      .status(200)
      .json({ Estado: "guardado correctamente", categoria: nuevaCategoria });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => err.message);
      console.log("Errores de validación:", errores);
      return res.status(400).json({ errores });
    } else {
      console.error("Error al guardar la categoria", error);
      res.status(500).json({ error: "Error al guardar la categoria" });
    }
  }
};
