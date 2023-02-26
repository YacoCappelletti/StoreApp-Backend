const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findAll({
      where: {
        id: uid,
      },
    });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid token- user does not exist in the database.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
