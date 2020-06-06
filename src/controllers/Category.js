const { Category } = require("../db/models");
const Op = require("sequelize").Op;

module.exports = {
  getCategory: async (req, res) => {
    try {
      const data = await Category.findAll({
        order: [["updatedAt", "DESC"]],
      });
      res.send({
        code: 200,
        status: "Ok",
        message: "Success add new category",
        data,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: error,
      });
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const result = Category.save({ name });
      res.send({
        code: 201,
        status: "Ok",
        message: "Success add new category product",
        data: result,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: error,
      });
    }
  },

  getOneCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({
        where: { id: { [Op.eq]: id } },
      });

      if (!category) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find category with id: ${id}`,
        });
      }

      res.send({
        code: 200,
        status: "OK",
        message: "Success fetching category",
        data: category,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: error,
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findOne({
        where: { id: { [Op.eq]: id } },
      });

      if (!category) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find category with id: ${id}`,
        });
      }

      category.name = name;

      await category.save();

      res.send({
        code: 200,
        status: "OK",
        message: "Success update category product",
        data: category,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: error,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({
        where: { id: { [Op.eq]: id } },
      });

      if (!category) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find category with id: ${id}`,
        });
      }

      await category.destroy();

      res.send({
        code: 200,
        status: "OK",
        message: "Success deleting category product",
        data: category,
      });
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: error,
      });
    }
  },
};
