const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
// const { validateCategory } = require("../middlewares/validator");
const { checkout } = require("../controllers/Checkout");

router.use(isAuth);

router.post("/", checkout);

module.exports = router;
