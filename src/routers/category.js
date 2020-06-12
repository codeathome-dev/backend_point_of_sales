const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
const {
  getCategory,
  addCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/Category");

router.use(isAuth);
router.get("/", getCategory);
router.post("/", addCategory);
router.get("/:id", getOneCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
