const { DataTypes } = require("sequelize");
const dbConnection = require("../database/config");

const User = dbConnection.define(
  "User",
  {
    userName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    timestamps: false,
  }
);

module.exports = User;
