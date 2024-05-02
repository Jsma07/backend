const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalleventas', {
    idDetalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Idventa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas',
        key: 'idVentas'
      }
    },
    Idinsumo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Usos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Precio_unitario: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detalleventas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDetalle" },
        ]
      },
      {
        name: "Idventa",
        using: "BTREE",
        fields: [
          { name: "Idventa" },
        ]
      },
    ]
  });
};
