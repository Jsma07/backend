const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agendamiento', {
    IdAgenda: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ServicioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'servicios',
        key: 'IdServicio'
      }
    },
    'Fecha/Hora': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    EmpleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empleados',
        key: 'IdEmpleado'
      }
    },
    ClienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'IdCliente'
      }
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'agendamiento',
    timestamps: false,
    indexes: [
      {
        name: "ServicioId",
        using: "BTREE",
        fields: [
          { name: "ServicioId" },
        ]
      },
      {
        name: "EmpleadoId",
        using: "BTREE",
        fields: [
          { name: "EmpleadoId" },
        ]
      },
      {
        name: "ClienteId",
        using: "BTREE",
        fields: [
          { name: "ClienteId" },
        ]
      },
    ]
  });
};
