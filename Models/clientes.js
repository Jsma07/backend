const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientes', {
    IdCliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Correo: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    FotoPerfil: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    IdRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'idRol'
      }
    }
  }, {
    sequelize,
    tableName: 'clientes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdCliente" },
        ]
      },
      {
        name: "IdRol",
        using: "BTREE",
        fields: [
          { name: "IdRol" },
        ]
      },
    ]
  });
};
