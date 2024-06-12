const Sequelize = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Definición del modelo Insumo con validaciones
const Insumo = sequelize.define('insumos', {
  IdInsumos: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  NombreInsumos: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  Cantidad: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  usos_unitarios: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  PrecioUnitario: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  UsosDisponibles: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Estado: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  IdCategoria: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Imagen: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'insumos',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "IdInsumos" },
      ]
    },
    {
      name: "IdCategoria",
      using: "BTREE",
      fields: [
        { name: "IdCategoria" },
      ]
    },
  ]
});

module.exports = Insumo;
