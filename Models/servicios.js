const Sequelize = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Definición del modelo Servicios
const Servicio = sequelize.define('servicios', {
  IdServicio: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Nombre_Servicio: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El nombre del servicio no puede estar vacío"
      },
      len: {
        args: [1, 30],
        msg: "El nombre del servicio debe tener entre 1 y 30 caracteres"
      }
    }
  },
  Precio_Servicio: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El precio del servicio no puede estar vacío"
      },
      isFloat: {
        msg: "El precio del servicio debe ser un número válido"
      },
      min: {
        args: [0],
        msg: "El precio del servicio debe ser un valor positivo"
      }
    }
  },
  Tiempo_Servicio: {
    type: Sequelize.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El tiempo del servicio no puede estar vacío"
      },
      len: {
        args: [1, 50],
        msg: "El tiempo del servicio debe tener entre 1 y 200 caracteres"
      }
    }
  },
  ImgServicio: {
    type: Sequelize.STRING(2000),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "La URL de la imagen del servicio no puede estar vacía"
      },
      isUrl: {
        msg: "La URL de la imagen del servicio debe ser una URL válida"
      }
    }
  },
  EstadoServicio: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isIn: {
        notEmpty: {
          msg: "El estado del servicio no puede estar vacía"
        },
        args: [[0, 1]], 
        msg: "El estado del servicio debe ser 0 (inactivo) o 1 (activo)"
      }
    }
  }
}, {
  sequelize,
  tableName: 'servicios',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "IdServicio" }
      ]
    }
  ]
});

module.exports = Servicio;
