const Sequelize = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Definición del modelo Categoria con validaciones
const Categoria = sequelize.define('categorias', {
  IdCategoria: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_categoria: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre de la categoría no puede estar vacío.'
      },
      len: {
        args: [1, 30],
        msg: "El nombre de la categoria debe tener entre 1 y 30 caracteres"
      }
    }
  },
  estado_categoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        notEmpty: {
          msg: "El estado de la categoria no puede estar vacía"
        },
        args: [[0, 1]], 
        msg: "El estado de la categoria debe ser 0 (inactivo) o 1 (activo)"
      }
    }
  }
}, {
  sequelize,
  tableName: 'categorias',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "IdCategoria" }
      ]
    }
  ]
});

module.exports = Categoria;
