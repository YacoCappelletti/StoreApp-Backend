const { Router } = require("express");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");
const { validateJWT } = require("../middlewares");
const router = Router();

router.post("/", [validateJWT], createCategory);
router.get("/", [validateJWT], getCategories);
router.get("/:id", [validateJWT], getCategoryById);
router.put("/:id", [validateJWT], updateCategory);
router.delete("/:id", [validateJWT], deleteCategory);

module.exports = router;
