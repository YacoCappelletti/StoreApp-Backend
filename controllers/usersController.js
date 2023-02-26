const { request, response } = require("express");

const { User } = require("../models");

const getUsers = async (req = request, res = response) => {
  const users = await User.findAll();
  res.json({ users });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findAll({
    where: {
      id: id,
    },
  });

  res.json({ user });
};

const createUser = async (req = request, res = response) => {
  const user = req.body;

  try {
    await User.create(user);
  } catch (error) {
    console.error(error);
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  try {
    await User.update(user, {
      where: {
        id: id,
      },
    });

    res.json({ msg: `User ${id} succesfully updated ` });
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.destroy({
    where: {
      id: id,
    },
  });

  res.json({ msg: `User ${id} succesfully deleted ` });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
