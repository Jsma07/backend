const Proveedor = require('../../../Models/proveedores');

exports.guardarProveedor = async (req, res) => {
    try {
        const { nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor } = req.body;

        // Verificar si el correo electrónico ya está registrado
        const existingCorreo = await Proveedor.findOne({ where: { correo_proveedor } });
        if (existingCorreo) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado para otro proveedor.' });
        }

        // Verificar si el número de teléfono ya está registrado
        const existingTelefono = await Proveedor.findOne({ where: { telefono_proveedor } });
        if (existingTelefono) {
            return res.status(400).json({ error: 'El número de teléfono ya está registrado para otro proveedor.' });
        }

        // Verificar si la dirección ya está registrada
        const existingDireccion = await Proveedor.findOne({ where: { direccion_proveedor } });
        if (existingDireccion) {
            return res.status(400).json({ error: 'La dirección ya está registrada para otro proveedor.' });
        }

        // Verificar si la empresa ya está registrada
        const existingEmpresa = await Proveedor.findOne({ where: { empresa_proveedor } });
        if (existingEmpresa) {
            return res.status(400).json({ error: 'La empresa ya está registrada para otro proveedor.' });
        }

        // Si todo está bien, proceder a guardar el proveedor
        const nuevoProveedor = await Proveedor.create({
            nombre_proveedor,
            correo_proveedor,
            telefono_proveedor,
            direccion_proveedor,
            empresa_proveedor,
            estado_proveedor
        });

        res.status(200).json({ Estado: 'guardado correctamente', proveedor: nuevoProveedor });
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
