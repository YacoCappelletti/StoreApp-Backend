const { Product, Category, User } = require("../models");
const dbConnection = require("./config");

Category.hasMany(Product);
Product.belongsTo(Category);
