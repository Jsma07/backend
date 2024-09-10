const Proveedor = require('../../../Models/proveedores');
const { Op } = require('sequelize');

exports.editarProveedor = async (req, res) => {
    try {
        const { IdProveedor } = req.params;
        const { NIT, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor } = req.body;
        console.log(req.body);

        const proveedor = await Proveedor.findByPk(IdProveedor);
        if (!proveedor) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

          if (NIT) {
            const existingNIT = await Proveedor.findOne({
                where: {
                    NIT,
                    IdProveedor: {
                        [Op.ne]: IdProveedor
                    }
                }
            });
            if (existingNIT) {
                return res.status(400).json({ error: 'El NIT de la empresa que ingresaste ya está registrado para otro proveedor.' });
            }
        }

        if (correo_proveedor) {
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
        }

        if (telefono_proveedor) {
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
        }

        if (direccion_proveedor) {
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
        }

        if (empresa_proveedor) {
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
        }
        await proveedor.update({
            NIT: NIT ?? proveedor.NIT,
            nombre_proveedor: nombre_proveedor ?? proveedor.nombre_proveedor,
            correo_proveedor: correo_proveedor ?? proveedor.correo_proveedor,
            telefono_proveedor: telefono_proveedor ?? proveedor.telefono_proveedor,
            direccion_proveedor: direccion_proveedor ?? proveedor.direccion_proveedor,
            empresa_proveedor: empresa_proveedor ?? proveedor.empresa_proveedor,
            estado_proveedor: estado_proveedor ?? proveedor.estado_proveedor,
        });

        res.status(200).json({ mensaje: 'Proveedor actualizado correctamente', proveedor });
    } catch (error) {
        console.error("Error al editar el proveedor", error);
        res.status(500).json({ error: 'Error al editar el proveedor' });
    }
};
