const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});
// Definición del modelo Agendamiento
const Agendamiento = sequelize.define('Agendamiento', {
  IdAgenda: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  IdCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'IdCliente'
    },
    validate: {
      notEmpty: {
        msg: "El ID del cliente no puede estar vacío"
      },
      isInt: {
        msg: "El ID del cliente debe ser un número entero"
      }
    }
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'servicios',
      key: 'IdServicio'
    },
    validate: {
      notEmpty: {
        msg: "El ID del servicio no puede estar vacío"
      },
      isInt: {
        msg: "El ID del servicio debe ser un número entero"
      }
    }
  },
  'Fecha/Hora': {
    type: DataTypes.STRING(200), // Considerar usar DataTypes.DATE si es posible
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "La fecha y hora no pueden estar vacías"
      }
    }
  },
  IdEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleados',
      key: 'IdEmpleado'
    },
    validate: {
      notEmpty: {
        msg: "El ID del empleado no puede estar vacío"
      },
      isInt: {
        msg: "El ID del empleado debe ser un número entero"
      }
    }
  },
  EstadoAgenda: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El estado de la agenda no puede estar vacío"
      },
      isIn: {
        args: [[0, 1,2,3]], // Asumiendo 0: Inactivo, 1: Activo
        msg: "El estado de la agenda debe ser 0 (inactivo) o 1 (activo)"
      }
    }
  }
}, {
  sequelize,
  tableName: 'agendamiento',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{ name: "IdAgenda" }]
    },
    {
      name: "IdEmpleado",
      using: "BTREE",
      fields: [{ name: "IdEmpleado" }]
    },
    {
      name: "IdServicio",
      using: "BTREE",
      fields: [{ name: "IdServicio" }]
    },
    {
      name: "IdCliente",
      using: "BTREE",
      fields: [{ name: "IdCliente" }]
    }
  ]
});

module.exports = Agendamiento;
