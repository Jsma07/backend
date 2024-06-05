const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const PermisosXRol = require('./permisos_roles'); // Asegúrate de que la ruta sea correcta
const Permisos = require('./permisos'); // Asegúrate de que la ruta sea correcta

const Roles = sequelize.define('roles', {
  idRol: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: true
  }
}, {
  tableName: 'roles',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idRol" },
      ]
    },
    {
      name: "ix_roles_idRol",
      using: "BTREE",
      fields: [
        { name: "idRol" },
      ]
    },
  ]
});

Roles.belongsToMany(Permisos, {
  through: PermisosXRol,
  foreignKey: 'rolId', // Nombre correcto del campo en la tabla permisos_roles que referencia a roles
  otherKey: 'permisoId' // Nombre correcto del campo en la tabla permisos_roles que referencia a permisos
});

module.exports = Roles;
