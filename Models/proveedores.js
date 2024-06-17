const Sequelize = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Proveedor = sequelize.define('proveedores', {
  IdProveedor: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre_proveedor: {
    type: Sequelize.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre del proveedor no puede estar vacío.'
      },
      noNumbers(value) {
        if (/\d/.test(value)) {
          throw new Error('El nombre del proveedor no puede contener números.');
        }
      },
      len: {
        args: [1, 30],
        msg: "El nombre del proveedor debe tener entre 1 y 50 caracteres"
      }
    }
  },
  correo_proveedor: {
    type: Sequelize.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El correo del proveedor no puede estar vacío.'
      },
      isEmail: {
        msg: 'Debe proporcionar un correo electrónico válido.'
      }
    }
  },
  telefono_proveedor: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El teléfono del proveedor no puede estar vacío.'
      },
      isNumeric: {
        msg: 'El teléfono del proveedor debe contener solo números.'
      }
    }
  },
  direccion_proveedor: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La dirección del proveedor no puede estar vacía.'
      }
    }
  },
  empresa_proveedor: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La empresa del proveedor no puede estar vacía.'
      },
      len: {
        args: [1, 30],
        msg: "La empresa del proveedor debe tener entre 1 y 50 caracteres"
      }
    }
  },
  estado_proveedor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        notEmpty: {
          msg: "El estado del proveedor no puede estar vacía"
        },
        args: [[0, 1]], 
        msg: "El estado del proveedor debe ser 0 (inactivo) o 1 (activo)"
      }
    }
  }
}, {
  sequelize,
  tableName: 'proveedores',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "IdProveedor" },
      ]
    }
  ]
});

module.exports = Proveedor;
