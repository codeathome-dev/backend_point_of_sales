const { Order, Checkout, Product, User, Category } = require("../db/models");
const moment = require("moment");
const Sequelize = require("sequelize");

module.exports = {
  checkout: async (req, res) => {
    try {
      const value = req.body;

      let checkout = { ...value };
      let orders = [...value.orders];

      delete checkout.orders;

      checkout = await Checkout.create(checkout);

      const [orderData] = await Promise.all([
        Order.bulkCreate(
          orders.map((data) => ({
            ...data,
            CheckoutId: checkout.id,
          })),
          { individualHooks: true }
        ),
        ...orders.map((data) =>
          Product.findOne({ where: { id: data.product_id } })
            .then((product) => {
              product.stock = product.stock - data.quantity;
              if (product.stock < 0)
                return res.send({
                  code: 409,
                  status: "Validation Error",
                  message: "Can't reduce product stock below 0!",
                });

              product.save();
            })
            .catch(async (err) => {
              await Order.destroy({ where: { checkout_id: checkout.id } });
              await Checkout.destroy({ where: { receipt: checkout.receipt } });
              throw err;
            })
        ),
      ]);

      orders = orderData;

      res.send({
        code: 201,
        status: "Created",
        message: "Checkout success!",
        data: { checkout, orders },
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

  getOrders: async (req, res) => {
    try {
      let { recent, limit, page = 1 } = req.query;
      const conditions = { order: [["createdAt", "DESC"]] };

      if (recent) {
        let date;
        switch (recent.toLowerCase()) {
          case "daily":
            date = [moment().subtract(1, "day").format(), moment().format()];
            break;
          case "weekly":
            date = [moment().subtract(1, "week").format(), moment().format()];
            break;
          case "monthly":
            date = [moment().subtract(1, "month").format(), moment().format()];
            break;
          case "yearly":
            date = [moment().subtract(1, "year").format(), moment().format()];
            break;
          default:
            return res.send({
              code: 405,
              status: "Method not allowed",
              message: "Recent must be daily, weekly, monthly and yearly",
            });
        }
        // select diantarann created_at and date
        conditions.where = {
          createdAt: { [Sequelize.Op.between]: date },
        };
      }

      if (limit) {
        limit = Number.parseInt(limit < 1 ? 1 : limit);
        page = Number.parseInt(page < 1 ? 1 : page);

        if (Number.isNaN(limit) || Number.isNaN(page)) {
          res.send({
            code: 400,
            status: "Bad Request",
            message: "Request query (limit or page) must be a number!",
          });
        }
        conditions.limit = limit;
        conditions.offset = (page - 1) * limit;
      }

      const config = {
        ...conditions,
        attributes: { exclude: ["user_id"] },
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "name", "email"],
          },
          {
            model: Order,
            // attributes: ["id", "quantity", "price"],
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Category,
                    as: "Category",
                    attributes: ["id", "name"],
                  },
                ],
                as: "Product",
                attributes: [
                  "id",
                  "name",
                  "description",
                  "image",
                  "price",
                  "stock",
                ],
              },
            ],
          },
        ],
      };

      const [data, count] = await Promise.all([
        Checkout.findAll(config),
        new Promise((resolve, reject) => {
          delete config.limit;
          delete config.offset;
          Checkout.findAll(config)
            .then((data) => resolve(data.length))
            .catch((err) => {
              reject(err);
            });
        }),
      ]);

      res.send({
        code: 200,
        status: "OK",
        message: !!count
          ? "Success fetching all orders"
          : "No orders available",
        data: {
          totalRows: count,
          totalPage: Math.ceil(count / (limit || count)),
          rows: data,
        },
      });
    } catch (error) {
      console.log(error);
      res.send({
        code: 500,
        status: "Internal server error!",
        message: "An error occured in server!",
        errors: true,
      });
    }
  },
};
