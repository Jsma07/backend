const Sequelize = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const DetalleCompra = sequelize.define('detallecompra', {
  IdDetalle: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  IdCompra: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'compras',
      key: 'IdCompra'
    }
  },
  IdCategoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'categorias',
      key: 'IdCategoria'
    }
  },
  Dimagen_insumo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Dnombre_insumo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  IdProveedor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'proveedores',
      key: 'IdProveedor'
    }
  },
  precio_unitario: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  cantidad_insumo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  totalValorInsumos: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'detallecompra',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "IdDetalle" }
      ]
    },
    {
      name: "IdCompra",
      using: "BTREE",
      fields: [
        { name: "IdCompra" }
      ]
    },
    {
      name: "IdProveedor",
      using: "BTREE",
      fields: [
        { name: "IdProveedor" }
      ]
    },
    {
      name: "IdCategoria",
      using: "BTREE",
      fields: [
        { name: "IdCategoria" }
      ]
    }
  ]
});

module.exports = DetalleCompra;
