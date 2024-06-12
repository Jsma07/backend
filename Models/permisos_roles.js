const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const PermisosXRol = sequelize.define('permisos_roles', {
  permisoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'permisos',
      key: 'idPermiso'
    }
  },
  rolId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'idRol'
    }
  }
}, {
  tableName: 'permisos_roles',
  timestamps: false,
  indexes: [
    {
      name: "permisoId",
      using: "BTREE",
      fields: [
        { name: "permisoId" },
      ]
    },
    {
      name: "rolId",
      using: "BTREE",
      fields: [
        { name: "rolId" },
      ]
    },
  ]
});

module.exports = PermisosXRol;
