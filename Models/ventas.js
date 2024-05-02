const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ventas', {
    idVentas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idServico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'servicios',
        key: 'IdServicio'
      }
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'IdCliente'
      }
    },
    idEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'IdEmpleado'
      }
    },
    Iva: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Descuento: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ventas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idVentas" },
        ]
      },
      {
        name: "idServico",
        using: "BTREE",
        fields: [
          { name: "idServico" },
        ]
      },
      {
        name: "idCliente",
        using: "BTREE",
        fields: [
          { name: "idCliente" },
        ]
      },
      {
        name: "idEmpleado",
        using: "BTREE",
        fields: [
          { name: "idEmpleado" },
        ]
      },
    ]
  });
};
