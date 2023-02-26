const { Product, Category } = require("../models");
const { request, response } = require("express");
const { getProducts } = require("./productsController");

const search = async (req = request, res = response) => {
  const { searchTerm } = req.params;

  try {
    const productsSearch = await Product.findAll({
      include: [Category],
    });

    const products = [];

    productsSearch.forEach((product) => {
      if (product.name.startsWith(searchTerm)) {
        products.push(product);
      }
    });

    res.json([{ results: products.length }, products]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  search,
};
