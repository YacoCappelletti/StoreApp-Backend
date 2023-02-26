const { Router } = require("express");
const { check } = require("express-validator");

const { validate } = require("../middlewares/validations");
const { login } = require("../controllers/authController");

const router = Router();

router.post(
  "/login",
  [
    check("userName", "User name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validate,
  ],
  login
);

module.exports = router;
