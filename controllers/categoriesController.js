const { request, response } = require("express");

const { Category } = require("../models");

const getCategories = async (req = request, res = response) => {
  const categories = await Category.findAll();
  res.json(categories);
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findAll({
    where: {
      id: id,
    },
  });

  res.json(category);
};

const createCategory = async (req = request, res = response) => {
  const category = req.body;

  try {
    await Category.create(category);
  } catch (error) {
    console.error(error);
  }

  res.json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = req.body;

  try {
    await Category.update(category, {
      where: {
        id: id,
      },
    });

    res.json({ msg: `Category ${id} succesfully updated ` });
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await Category.destroy({
    where: {
      id: id,
    },
  });

  res.json({ msg: `Category ${id} succesfully deleted ` });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};