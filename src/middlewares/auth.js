const { verify } = require("jsonwebtoken");
const { User } = require("../db/models");

const isAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = verify(token, process.env.JWT_KEY || "secret");
    const user = await User.findOne({ _id: data.id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.role === "admin") {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
  next();
};

const isKasir = (req, res, next) => {
  if (!req.user.role === "kasir") {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
  next();
};

module.exports = {
  isAuth,
  isAdmin,
  isKasir,
};
