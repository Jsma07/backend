const Roles = require('../../Models/roles');
const Permisos = require('../../Models/permisos');

const editarRol = async (req, res) => {
    const { id } = req.params;
    const { nombre, permisos, EstadoRol } = req.body;

    try {
        // Validar el nombre
        if (!nombre || nombre.trim() === '') {
            return res.status(400).json({ error: "Nombre del rol requerido" });
        }

        // Validar los permisos
        if (!Array.isArray(permisos) || permisos.some(id => typeof id !== 'number' || id <= 0)) {
            return res.status(400).json({ error: 'Los permisos deben ser un arreglo de números enteros positivos' });
        }

        // Validar EstadoRol
        if (EstadoRol !== undefined && (typeof EstadoRol !== 'number' || ![0, 1].includes(EstadoRol))) {
            return res.status(400).json({ error: 'EstadoRol debe ser 0 o 1' });
        }

        // Buscar el rol existente
        const rolExistente = await Roles.findByPk(id);
        if (!rolExistente) {
            return res.status(404).json({ error: 'Rol no existe' });
        }

        // Actualizar el nombre y estado del rol
        rolExistente.nombre = nombre;
        if (EstadoRol !== undefined) {
            rolExistente.EstadoRol = EstadoRol;
        }
        await rolExistente.save();

        // Actualizar permisos
        const permisosAsociados = await Permisos.findAll({ where: { idPermiso: permisos } });
        await rolExistente.setPermisos(permisosAsociados);

        // Obtener el rol actualizado
        const rolActualizado = await Roles.findByPk(id, {
            include: {
                model: Permisos,
                as: 'permisos',
                through: { attributes: [] }
            }
        });

        res.status(200).json({ mensaje: 'Rol actualizado correctamente', rol: rolActualizado });
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ error: 'Error interno del servidor ' });
    }
};

const traerRol = async (req, res) => {
    const { id } = req.params;

    try {
        const rol = await Roles.findByPk(id, {
            include: {
                model: Permisos,
                as: 'permisos',
                through: { attributes: [] }
            }
        });

        if (!rol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }

        res.status(200).json({ rol });
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { editarRol, traerRol };
