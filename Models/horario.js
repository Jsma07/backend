const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Horario = sequelize.define('Horario', {
  fecha: {
  type: DataTypes.DATEONLY,
  allowNull: false,
  unique: true
},

  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'inactivo'
  }
}, {
  timestamps: true
});

module.exports = Horario;
