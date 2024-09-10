const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Definir el modelo de Notificaciones
const Notificaciones = sequelize.define('Notificaciones', {
  IdNotificacion: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  IdCliente: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'IdCliente'
    }
  },
  IdAgenda: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'agendamiento',
      key: 'IdAgenda'
    }
  },
  Tipo: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  Mensaje: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  Leido: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  FechaCreacion: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize,
  tableName: 'notificaciones',
  timestamps: false
});

// Asociaciones con las tablas relacionadas
Notificaciones.belongsTo(require('./clientes'), { foreignKey: 'IdCliente', as: 'cliente' });
Notificaciones.belongsTo(require('./agendamiento'), { foreignKey: 'IdAgenda', as: 'agendamiento' });

module.exports = Notificaciones;
