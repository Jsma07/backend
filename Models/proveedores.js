const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proveedores', {
    IdProveedor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_proveedor: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    correo_proveedor: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    telefono_proveedor: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    direccion_proveedor: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    empresa_proveedor: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    estado_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'proveedores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdProveedor" },
        ]
      },
    ]
  });
};
