const Proveedor = require("../../..Models/proveedores");
const { Op } = require("sequelize");

exports.guardarProveedor = async (req, res) => {
  try {
    let {
      NIT,
      nombre_proveedor,
      correo_proveedor,
      telefono_proveedor,
      direccion_proveedor,
      empresa_proveedor,
      estado_proveedor,
    } = req.body;

    const formatNombreProveedor = (nombre) => {
      return nombre
        .toLowerCase()
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
    };

    nombre_proveedor = formatNombreProveedor(nombre_proveedor);

    const formatEmpresaProveedor = (nombre) => {
      return nombre
        .toLowerCase()

        .replace(/\b\w/g, (letra) => letra.toUpperCase());
    };

    empresa_proveedor = formatEmpresaProveedor(empresa_proveedor);

    const existingNitProveedor = await Proveedor.findOne({ where: { NIT } });
    if (existingNitProveedor) {
      return res
        .status(400)
        .json({ error: "El NIT del proveedor ya está registrado." });
    }

    const existingCorreoProveedor = await Proveedor.findOne({
      where: { correo_proveedor },
    });
    if (existingCorreoProveedor) {
      return res
        .status(400)
        .json({ error: "El correo del proveedor ya está registrado." });
    }

    const existingTelefonoProveedor = await Proveedor.findOne({
      where: { telefono_proveedor },
    });
    if (existingTelefonoProveedor) {
      return res
        .status(400)
        .json({ error: "El telefono del proveedor ya está registrado." });
    }

    const existingDireccionProveedor = await Proveedor.findOne({
      where: { direccion_proveedor },
    });
    if (existingDireccionProveedor) {
      return res
        .status(400)
        .json({ error: "La direccion del proveedor ya está registrado." });
    }

    const existingEmpresaProveedor = await Proveedor.findOne({
      where: { empresa_proveedor },
    });
    if (existingEmpresaProveedor) {
      return res
        .status(400)
        .json({ error: "La empresa del proveedor ya está registrado." });
    }

    const nuevoProveedor = await Proveedor.create({
      NIT,
      nombre_proveedor,
      correo_proveedor,
      telefono_proveedor,
      direccion_proveedor,
      empresa_proveedor,
      estado_proveedor,
    });

    res
      .status(200)
      .json({ estado: "guardado correctamente", proveedor: nuevoProveedor });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error("Error al guardar proveedor", error);
      res.status(500).json({ error: "Error al guardar proveedor" });
    }
  }
};
