const { check, validationResult } = require("express-validator");

module.exports = {
  validateCategory: [
    check("name").notEmpty(),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).send({ error: error.array() });
      }
      next();
    },
  ],

  validateProduct: [
    check("name").notEmpty(),
    check("description").notEmpty(),
    check("price").notEmpty(),
    check("stock").notEmpty(),
    check("idCategory").notEmpty(),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).send({ error: error.array() });
      }
      next();
    },
  ],
};
