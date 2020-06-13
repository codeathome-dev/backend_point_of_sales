const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");

const { getDailyHistory } = require("../controllers/Dashboard");

router.use(isAuth);

router.get("/daily", getDailyHistory);

module.exports = router;
