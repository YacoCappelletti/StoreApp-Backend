const { Router } = require("express");
const { check } = require("express-validator");
const { validate, validateJWT } = require("../middlewares");
const { validateFileToUpload } = require("../middlewares/validateFile");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("name", "The name field can not be empty").not().isEmpty(),
    check("price", "The price field can not be empty").not().isEmpty(),
    check("stock", "The stock field can not be empty").not().isEmpty(),
    check("category", "The category field can not be empty").not().isEmpty(),
    validate,
    validateFileToUpload,
  ],
  createProduct
);
router.get("/", [validateJWT], getProducts);
router.get("/:id", [validateJWT], getProductById);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "The name field can not be empty").not().isEmpty(),
    check("price", "The price field can not be empty").not().isEmpty(),
    check("stock", "The stock field can not be empty").not().isEmpty(),
    check("category", "The category field can not be empty").not().isEmpty(),
    validate,
    //validateFileToUpload,
  ],
  updateProduct
);

router.delete("/:id", [validateJWT], deleteProduct);

module.exports = router;
