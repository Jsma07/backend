const Proveedor = require('../../../models/proveedores');
const { Op } = require('sequelize');

exports.guardarProveedor = async (req, res) => {
    try {
        const { NIT, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor } = req.body;

        const proveedorExistente = await Proveedor.findOne({
            where: {
                [Op.or]: [
                    { NIT },
                    { correo_proveedor },
                    { telefono_proveedor },
                    { direccion_proveedor },
                    { empresa_proveedor }
                ]
            }
        });

        if (proveedorExistente) {
            return res.status(400).json({ error: 'Ya existe un proveedor con el mismo NIT, correo, teléfono, dirección o empresa.' });
        }

        const nuevoProveedor = await Proveedor.create({
            NIT,
            nombre_proveedor,
            correo_proveedor,
            telefono_proveedor,
            direccion_proveedor,
            empresa_proveedor,
            estado_proveedor
        });

        res.status(200).json({ estado: 'guardado correctamente', proveedor: nuevoProveedor });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al guardar proveedor", error);
            res.status(500).json({ error: 'Error al guardar proveedor' });
        }
    }
};
