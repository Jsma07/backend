const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('insumos', {
    IdInsumos: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    NombreInsumos: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    UsosDisponibles: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Estado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Idcategoria: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Imagen: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
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
        name: "Id categoria",
        using: "BTREE",
        fields: [
          { name: "Idcategoria" },
        ]
      },
    ]
  });
};
