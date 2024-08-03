const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Horario = require('./horario');

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
    }
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'servicios',
      key: 'IdServicio'
    }
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  Hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  IdEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleados',
      key: 'IdEmpleado'
    }
  },
  EstadoAgenda: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1 
  }
}, {
  sequelize,
  tableName: 'agendamiento',
  timestamps: false
});

Agendamiento.belongsTo(require('./clientes'), { foreignKey: 'IdCliente', as: 'cliente' });
Agendamiento.belongsTo(require('./empleados'), { foreignKey: 'IdEmpleado', as: 'empleado' });
Agendamiento.belongsTo(require('./servicios'), { foreignKey: 'IdServicio', as: 'servicio' });
Agendamiento.belongsTo(Horario, { foreignKey: 'Fecha', targetKey: 'fecha' });


module.exports = Agendamiento;
