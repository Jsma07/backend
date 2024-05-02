const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permisos_roles', {
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
    sequelize,
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
};
