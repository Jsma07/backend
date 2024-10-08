const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
  dialect: 'mysql',
});

// Definición del modelo Servicios
const Servicio = sequelize.define(
  "servicios",
  {
    IdServicio: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Nombre_Servicio: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del servicio no puede estar vacío",
        },
        len: {
          args: [1, 30],
          msg: "El nombre del servicio debe tener entre 1 y 30 caracteres",
        },
      },
    },
    Precio_Servicio: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El precio del servicio no puede estar vacío",
        },
        isFloat: {
          msg: "El precio del servicio debe ser un número válido",
        },
        min: {
          args: [20000],
          msg: "El precio del servicio debe ser minimo de $20.000",
        },
      },
    },
    Tiempo_Servicio: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El tiempo del servicio no puede estar vacío",
        },
        isInt: {
          msg: "El tiempo del servicio debe ser un número entero",
        },
      },
    },
    ImgServicio: {
      type: Sequelize.STRING(2000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La URL de la imagen del servicio no puede estar vacía",
        },
        // Comentamos la validación isUrl si se usa ruta relativa
        // isUrl: true
      },
    },

    EstadoServicio: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          notEmpty: {
            msg: "El estado del servicio no puede estar vacía",
          },
          args: [[0, 1]],
          msg: "El estado del servicio debe ser 0 (inactivo) o 1 (activo)",
        },
      },
    },
    Descripcion_Servicio: {
      type: Sequelize.STRING(1000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La descripción del servicio no puede estar vacía",
        },
        len: {
          args: [1, 1000],
          msg: "La descripción del servicio debe tener entre 1 y 1000 caracteres",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "servicios",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdServicio" }],
      },
    ],
  }
);

module.exports = Servicio;
