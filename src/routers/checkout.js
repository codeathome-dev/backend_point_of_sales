const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");
// const { validateCategory } = require("../middlewares/validator");
const { checkout, getOrders } = require("../controllers/Checkout");

router.use(isAuth);

router.post("/", checkout);
router.get("/", getOrders);

module.exports = router;
