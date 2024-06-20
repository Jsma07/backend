const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compras', {
    IdCompra: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_compra: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    descuento_compra: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    iva_compra: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    subtotal_compra: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado_compra: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'compras',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdCompra" },
        ]
      },
    ]
  });
};
