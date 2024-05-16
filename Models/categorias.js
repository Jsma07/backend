const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorias', {
    IdCategoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    imagen_categoria: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    nombre_categoria: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    estado_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false
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
          { name: "IdCategoria" },
        ]
      },
    ]
  });
};
