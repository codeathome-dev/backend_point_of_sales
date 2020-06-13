const { Checkout, User, Product, Category, Order } = require("../db/models");
const Sequelize = require("sequelize");
const moment = require("moment");

module.exports = {
  getDailyHistory: async (req, res) => {
    try {
      const { limit = 15 } = req.query;
      let history = {
        recent: [moment().subtract(1, "day").format(), moment().format()],
        last: [
          moment().subtract(2, "day").format(),
          moment().subtract(1, "day").format(),
        ],
      };
      const config = (date) => ({
        order: [["created_at", "DESC"]],
        where: {
          created_at: {
            [Sequelize.Op.between]: date,
          },
        },
        attributes: { exclude: ["user_id"] },
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "name", "email"],
          },
          {
            model: Order,
            attributes: ["id", "quantity", "price"],
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
      });

      const [recent, last, data] = await Promise.all([
        Checkout.findAll(config(history.recent)),
        Checkout.findAll(
          config(config(history.last)),
          Checkout.findAll({ limit, offset: 0, ...config(history.recent) })
        ),
      ]);

      res.send({
        code: 200,
        status: "OK",
        message: "Success fetching daily revenue",
        data: {
          recentIncome: recent.reduce((acc, cur) => acc + cur.amount, 0),
          lastIncome: last.reduce((acc, cur) => acc + cur.amount, 0),
          data,
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
