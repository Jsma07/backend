const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

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
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Los usos disponibles deben ser un número entero.'
      },
      min: {
        args: [10],
        msg: 'Los usos disponibles deben de ser minimo de 10.'
      }
    }
  },
  Estado: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El estado no puede estar vacío.'
      },
      isIn: {
        args: [['Disponible', 'Terminado']],
        msg: 'El estado debe ser "Disponible" o "Terminado".'
      }
    }
  },
  IdCategoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El ID de categoría no puede estar vacío.'
      },
      isInt: {
        msg: 'El ID de categoría debe ser un número entero.'
      }
    }
  },
  Imagen: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La imagen no puede estar vacía.'
      }
    }
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

