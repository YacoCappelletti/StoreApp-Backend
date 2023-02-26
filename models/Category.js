const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const Category = dbConnection.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Category;
