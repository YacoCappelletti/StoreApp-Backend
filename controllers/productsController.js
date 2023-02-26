const { request, response } = require("express");
const { uploadFile } = require("../helpers/uploadFile");
const path = require("path");
const fs = require("fs");
const { Product, Category } = require("../models");

const createProduct = async (req = request, res = response) => {
  const product = req.body;
  try {
    const name = await uploadFile(req.files);
    await Product.create(
      {
        name: product.name,
        price: product.price,
        image: name,
        stock: product.stock,
        CategoryId: product.category,
      },
      {
        include: [Category],
      }
    );
    res.json({ product, msg: "Product succesfully created" });
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async (req = request, res = response) => {
  const products = await Product.findAll({
    include: [Category],
  });

  res.json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findAll({
      where: {
        id: id,
      },
      include: [Category],
    });

    res.json(product);
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  let imagePath;

  const [product] = await Product.findAll({
    where: {
      id: id,
    },
    include: [Category],
  });
  try {
    if (req.files != null) {
      imagePath = path.join(__dirname, "../public", product.image);
      if (imagePath) {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      const name = await uploadFile(req.files);

      await Product.update(
        {
          name: updatedProduct.name,
          price: updatedProduct.price,
          image: name,
          stock: updatedProduct.stock,
          CategoryId: updatedProduct.category,
        },
        {
          where: {
            id: id,
          },
          include: Category,
        }
      );
    } else {
      await Product.update(
        {
          name: updatedProduct.name,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
          CategoryId: updatedProduct.category,
        },
        {
          where: {
            id: id,
          },
          include: Category,
        }
      );
    }

    res.json({ msg: `Product ${id} updated succesfully` });
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const [product] = await Product.findAll({
    where: {
      id: id,
    },
    include: [Category],
  });

  const imagePath = path.join(__dirname, "../public", product.image);
  if (imagePath) {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await Product.destroy({
    where: {
      id: id,
    },
  });

  res.json({ msg: `Product ${id} succesfully deleted ` });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
