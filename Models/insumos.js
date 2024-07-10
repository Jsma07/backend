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
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre del insumo no puede estar vacío.'
      },
      len: {
        args: [1, 60],
        msg: 'El nombre del insumo debe tener entre 1 y 60 caracteres.'
      }
    }
  },
  Cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La cantidad no puede estar vacía.'
      },
      isInt: {
        msg: 'La cantidad debe ser un número entero.'
      },
      min: {
        args: [1],
        msg: 'La cantidad debe de ser minimo de 1 unidad.'
      }
    }
  },
  usos_unitarios: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Los usos unitarios no pueden estar vacíos.'
      },
      isInt: {
        msg: 'Los usos unitarios deben ser un número entero.'
      },
      min: {
        args: [2],
        msg: 'Los usos unitarios deben de ser minimo de 2.'
      }
    }
  },
  PrecioUnitario: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El precio unitario no puede estar vacío.'
      },
      isFloat: {
        msg: 'El precio unitario debe ser un número flotante.'
      },
      min: {
        args: [1000],
        msg: 'El precio unitario no puede ser menor a 1000.'
      }
    }
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
    type: Sequelize.STRING(2000),
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

