const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

const Usuario = sequelize.define('usuarios', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  tipoDocumento: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate:{
      len: [3, 30],
      notEmpty: true
    }
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate:{
      len: [3, 30],
      // isAlpha: true,
      notEmpty: true
    }
  },
  apellido: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      len: [3, 30],
      // isAlpha: true,
      notEmpty: true
    }
  },
  correo: {
    type: Sequelize.STRING(120),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      
     len: [8,20]
    }
  },
  contrasena: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate:{
      isLongEnough(value){
        if(value.length < 8){
          throw new Error("La contraseña debe tener al menos 8 caracteres.");
        }
      }
    }
  },
  rolId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'idRol'
    }
  },
  estado: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Documento: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Documento es obligatorio'
      },
      len: {
        args: [8, 20],
        msg: 'El campo Documento debe tener entre 8 y 20 caracteres'
      }
    }
  },
}, {
  sequelize,
  tableName: 'usuarios',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idUsuario" }
      ]
    },
    {
      name: "rolId",
      using: "BTREE",
      fields: [
        { name: "rolId" }
      ]
    },
    {
      name: "ix_usuarios_id",
      using: "BTREE",
      fields: [
        { name: "idUsuario" }
      ]
    }
  ]
});

module.exports = Usuario;

