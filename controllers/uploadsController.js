const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { uploadFile } = require("../helpers/uploadFile");
const { Product } = require("../models/");

const fileUpload = async (req = request, res = response) => {
  try {
    const name = await uploadFile(req.files);
    res.json({
      name,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImage = async (req, res = response) => {
  const { id } = req.params;

  let product;

  product = await Product.findAll({
    where: {
      id: id,
    },
  });
  if (!product) {
    return res.status(400).json({
      msg: `The product you are looking for does not exist`,
    });
  }

  if (product.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      "product",
      product.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const name = await uploadFile(req.files, undefined, coleccion);
  product.img = name;

  await product.save();

  res.json(product);
};

const showImage = async (req = request, res = response) => {
  const { id } = req.params;

  let product;

  product = await Product.findAll({
    where: {
      id: id,
    },
  });

  if (!product) {
    return res.status(400).json({
      msg: `No existe un producto con el id ${id}`,
    });
  }

  if (product.img) {
    const pathImagen = path.resolve(
      __dirname,
      "../uploads",
      "products",
      product.img
    );

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const placeholder = path.resolve(__dirname, "../assets", "no-image.jpg");
  res.sendFile(placeholder);
  
};
module.exports = {
  fileUpload,
  updateImage,
  showImage,
};
