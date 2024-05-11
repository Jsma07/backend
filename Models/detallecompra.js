const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detallecompra', {
    IdDetalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdCompra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compras',
        key: 'IdCompra'
      }
    },
    IdInsumo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'insumos',
        key: 'IdInsumos'
      }
    },
    IdProveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proveedores',
        key: 'IdProveedor'
      }
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    cantidad_insumo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detallecompra',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdDetalle" },
        ]
      },
      {
        name: "IdCompra",
        using: "BTREE",
        fields: [
          { name: "IdCompra" },
        ]
      },
      {
        name: "IdInsumo",
        using: "BTREE",
        fields: [
          { name: "IdInsumo" },
        ]
      },
      {
        name: "IdProveedor",
        using: "BTREE",
        fields: [
          { name: "IdProveedor" },
        ]
      },
    ]
  });
};
