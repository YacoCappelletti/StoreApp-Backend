const { Router } = require("express");
const { search } = require("../controllers/searchController");
const { validateJWT } = require("../middlewares");

const router = Router();

router.get("/:searchTerm", [validateJWT], search);

module.exports = router;
