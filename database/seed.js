const dbConnection = require("../database/config");
require("../database/asociations");
const { Product, Category, User } = require("../models");

const products = [
  {
    name: "Coca-Cola",
    image: "coca-cola image",
    stock: 30,
    Category: { name: "drinks" },
    price: 2.5,
  },
  {
    name: "Orange Fanta",
    image: "orange fanta image",
    stock: 20,
    Category: { name: "drinks" },
    price: 2,
  },
  {
    name: "Oreo",
    image: "oreo image",
    stock: 10,
    Category: { name: "cookies" },
    price: 1.5,
  },
  {
    name: "Cheese Pizza",
    image: "cheese pizza image",
    stock: 40,
    Category: { name: "pizza" },
    price: 3,
  },
  {
    name: "Chocolate",
    image: "chocolate image",
    stock: 10,
    Category: { name: "chocolates" },
    price: 2,
  },
  {
    name: "White Chocolate",
    image: "white chocolate image",
    stock: 10,
    Category: { name: "chocolates" },
    price: 2,
  },
  {
    name: "Sprite",
    image: "sprite imgae",
    stock: 20,
    Category: { name: "drinks" },
    price: 2,
  },
  {
    name: "Aquarius",
    image: "aquarius image",
    stock: 20,
    Category: { name: "drinks" },
    price: 2,
  },
  {
    name: "Nestea",
    image: "nestea image",
    stock: 20,
    Category: { name: "drinks" },
    price: 2,
  },
  {
    name: "Pepitos",
    image: "pepitos image",
    stock: 20,
    Category: { name: "cookies" },
    price: 1,
  },
];

dbConnection
  .sync({ alter: true })

  .then(() => {
    products.forEach((product) =>
      Product.create(product, {
        include: [Category],
      })
    );
  })
  .then(() => {
    User.create({
      userName: "admin",
      password: "admin",
      role: "ADMIN",
    });
  })
  .catch((err) => console.log(err));
