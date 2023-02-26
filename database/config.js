const { Sequelize } = require("sequelize");

const database = process.env.DATABASE || "storeapp";
const username = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "root";

const dbConnection = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = dbConnection;
