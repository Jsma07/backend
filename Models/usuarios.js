const Sequelize = require('sequelize');

const Usuario = sequelize.define('usuarios', {
  // Define las propiedades del modelo de usuario aquí
  idUsuario: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombreUsuario: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  apellidoUsuario: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  correo: {
    type: Sequelize.STRING(120),
    allowNull: true
  },
  telefono: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  contrasena: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  rolId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'idRol'
    }
  },
  estado: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  // Define las opciones del modelo aquí
  sequelize,
  tableName: 'usuarios',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "rolId",
      using: "BTREE",
      fields: [
        { name: "rolId" },
      ]
    },
    {
      name: "ix_usuarios_id",
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});
