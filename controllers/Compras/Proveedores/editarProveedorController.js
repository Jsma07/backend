const Proveedor = require('../../../models/proveedores');
const { Op } = require('sequelize');

exports.editarProveedor = async (req, res) => {
    try {
        const { IdProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor } = req.body;
        console.log(req.body)
        // Verificar si el correo electrónico ya está registrado para otro proveedor
        const existingCorreo = await Proveedor.findOne({
            where: {
                correo_proveedor,
                IdProveedor: {
                    [Op.ne]: IdProveedor
                }
            }
        });
        if (existingCorreo) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado para otro proveedor.' });
        }

        // Verificar si el número de teléfono ya está registrado para otro proveedor
        const existingTelefono = await Proveedor.findOne({
            where: {
                telefono_proveedor,
                IdProveedor: {
                    [Op.ne]: IdProveedor
                }
            }
        });
        if (existingTelefono) {
            return res.status(400).json({ error: 'El número de teléfono ya está registrado para otro proveedor.' });
        }

        // Verificar si la dirección ya está registrada para otro proveedor
        const existingDireccion = await Proveedor.findOne({
            where: {
                direccion_proveedor,
                IdProveedor: {
                    [Op.ne]: IdProveedor
                }
            }
        });
        if (existingDireccion) {
            return res.status(400).json({ error: 'La dirección ya está registrada para otro proveedor.' });
        }

        // Verificar si la empresa ya está registrada para otro proveedor
        const existingEmpresa = await Proveedor.findOne({
            where: {
                empresa_proveedor,
                IdProveedor: {
                    [Op.ne]: IdProveedor
                }
            }
        });
        if (existingEmpresa) {
            return res.status(400).json({ error: 'La empresa ya está registrada para otro proveedor.' });
        }

        // Si no hay conflictos, proceder con la actualización del proveedor
        await Proveedor.update(
            {
                nombre_proveedor,
                correo_proveedor,
                telefono_proveedor,
                direccion_proveedor,
                empresa_proveedor,
                estado_proveedor: 1
            },
            {
                where: { IdProveedor }
            }
        );

        res.status(200).json({ Estado: 'editado correctamente' });
    } catch (error) {
        console.error("Error al editar el proveedor", error);
        res.status(500).json({ error: 'Error al editar el proveedor' });
    }
};
