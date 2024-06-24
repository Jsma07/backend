
const ConexionDB = require('../../Db/Conexion');
const Roles = require('../../Models/roles');
const Permisos = require('../../Models/permisos');
const PermisosXRol = require ('../../Models/permisos_roles')
const listarRoles = async (req, res) => {
    try {
        const rolesConPermisos = await Roles.findAll({
            include: [
                {
                    model: Permisos,
                    through: {
                        model: PermisosXRol,
                        attributes: [] // No se incluyen atributos de la tabla intermedia
                    },
                    attributes: ['idPermiso', 'nombre'] // Atributos específicos de permisos que deseas incluir
                }
            ]
        });
       
        res.json(rolesConPermisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { listarRoles };
