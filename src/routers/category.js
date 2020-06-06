const express = require("express");
const router = express.Router();
const {
  getCategory,
  addCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/Category");

router.get("/", getCategory);
router.post("/", addCategory);
router.get("/:id", getOneCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
