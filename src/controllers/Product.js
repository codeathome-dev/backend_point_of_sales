const { Product, Category } = require("../db/models");
const path = require("path");
const fs = require("fs-extra");
const Op = require("sequelize").Op;

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;

      if (!req.file) {
        return res.send({
          code: 404,
          message: "Not found, Image",
        });
      }

      const checkCategory = await Category.findOne({
        where: {
          id: category,
        },
      });

      if (!checkCategory) {
        res.send({
          code: 404,
          message: `Not Found, Can't find category with id: ${category}`,
        });
      }

      const insert = await Product.create({
        name,
        description,
        price,
        category: category,
        stock,
        image: `images/${req.file.filename}`,
      });

      //   const result = Product.save({ name });
      res.send({
        code: 201,
        status: "Ok",
        message: "Success add new category product",
        data: insert,
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
  getProduct: async (req, res) => {
    try {
      const sorting = { asc: "ASC", desc: "DESC" };

      let conditions = { order: [["updatedAt", "DESC"]] };

      let { search, category, limit, sort, page = 1 } = req.query;

      if (search) {
        conditions.where = { name: { [Op.substring]: search } };
      }

      if (category) {
        conditions.where = { ...conditions.where, category: category };
      }

      if (sort) {
        const sortingFields = [
          "name",
          "category",
          "price",
          "createdAt",
          "updatedAt",
        ];
        let [field, order] = sort.toLowerCase().split("-");
        const column = sortingFields.find((col) =>
          field.includes(col.toLocaleLowerCase())
        );

        if (!column)
          return res.send({
            code: 400,
            status: "Bad Request",
            message: `Can't sort product by '${field}'`,
          });

        if (!(order in sorting))
          return res.send({
            code: 405,
            status: "Method not allowed",
            message: "Sorting method must be: ASC or DESC!",
          });

        conditions.order = [[column, sorting[order]]];
      }

      if (limit) {
        limit = Number.parseInt(limit < 1 ? 1 : limit);
        page = Number.parseInt(page < 1 ? 1 : page);

        if (Number.isNaN(limit) || Number.isNaN(page))
          res.send({
            code: 400,
            status: "Bad Request",
            message: "Request query (limit or page) must be a number!",
          });

        conditions.limit = limit;
        conditions.offset = (page - 1) * limit;
      }

      data = await Product.findAndCountAll({
        ...conditions,
        include: [{ model: Category, as: "Category" }],
        attributes: {
          exclude: ["category"],
        },
      });

      data = {
        totalRows: data.count,
        totalPage: Math.ceil(data.count / (limit || data.count)),
        rows: data.rows,
      };

      res.send({
        code: 200,
        status: "OK",
        message: !!data.rows.length
          ? "Success fetching all products"
          : "No product available",
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

  getOneProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Product.findOne({
        where: { id },
        include: [{ model: Category, as: "Category" }],
        attributes: {
          exclude: ["category"],
        },
      });

      if (!data) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find product with id: ${id}`,
        });
      }

      res.send({
        code: 200,
        status: "OK",
        message: "Success fetching product",
        data,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: true,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, stock } = req.body;

      const data = await Product.findOne({
        where: { id },
      });

      const checkcategory = await Category.findOne({
        where: { id: category },
      });

      if (!data) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find product with id: ${id}`,
        });
      }

      if (!checkcategory) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find category with id: ${category}`,
        });
      }

      if (req.file === undefined) {
        data.name = name;
        data.description = description;
        data.price = price;
        data.category = category;
        data.stock = stock;

        await data.save();
      } else {
        await fs.unlink(path.join(`uploads/${data.image}`));
        data.name = name;
        data.description = description;
        data.price = price;
        data.category = category;
        data.stock = stock;
        data.image = `images/${req.file.filename}`;
        await data.save();
      }
      res.send({
        code: 200,
        status: "OK",
        message: "Success update product",
        data,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: true,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOne({
        where: { id: { [Op.eq]: id } },
      });

      if (!product) {
        return res.send({
          code: 404,
          message: `Not Found, Can't find product with id: ${id}`,
        });
      }
      await fs.unlink(path.join(`uploads/${product.image}`));
      await product.destroy();

      res.send({
        code: 200,
        status: "OK",
        message: "Success deleting product",
        data: product,
      });
    } catch (error) {
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: true,
      });
    }
  },
};
