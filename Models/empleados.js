const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

// Definir el modelo de empleado
const Empleado = sequelize.define('empleados', {
  IdEmpleado: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Nombre: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Nombre es obligatorio'
      },
      isAlpha: {
        msg: 'El campo Nombre solo puede contener letras'
      }
    }
  },
  Apellido: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Apellido es obligatorio'
      },
      isAlpha: {
        msg: 'El campo Apellido solo puede contener letras'
      }
    }
  },
  Correo: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Correo es obligatorio'
      },
      isEmail: {
        msg: 'El campo Correo debe ser una dirección de correo electrónico válida'
      }
    }
  },
  Telefono: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Teléfono es obligatorio'
      },
      isInt: {
        msg: 'El campo Teléfono debe ser un número entero'
      }
    }
  },
  Estado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Estado es obligatorio'
      },
      isInt: {
        msg: 'El campo Estado debe ser un número entero'
      }
    }
  },
  FotoPerfil: {
    type: Sequelize.STRING(250),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo FotoPerfil es obligatorio'
      }
    }
  },
  IdRol: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo IdRol es obligatorio'
      },
      isInt: {
        msg: 'El campo IdRol debe ser un número entero'
      }
    }
  }
}, {
  tableName: 'empleados',
  timestamps: false
});

module.exports = Empleado;
