const { response, request } = require("express");
const User = require("../models/User");

const { generateJWT } = require("../helpers/generateJWT");
const { use } = require("../routes/auth");

const login = async (req = request, res = response) => {
  const { userName, password } = req.body;

  try {
    const result = await User.findAll({
      where: {
        userName: userName,
        password: password,
      },
    });

    const user = result[0];

    if (!user) {
      return res.status(400).json({
        msg: "Wrong username or password",
      });
    }

    const token = await generateJWT(user.dataValues.id);
   

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong, talk to the administrator.",
    });
  }
};

module.exports = {
  login,
};
