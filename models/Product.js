const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const Product = dbConnection.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    image: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },

  {
    // Other model options go here
    timestamps: false,
  }
);

module.exports = Product;
