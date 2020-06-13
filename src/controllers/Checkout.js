const { Order, Checkout, Product } = require("../db/models");

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
            checkout_id: checkout.id,
          })),
          { individualHooks: true }
        ),
        ...orders.map((data) =>
          Product.findOne({ where: { id: data.product_id } })
            .then((product) => {
              product.stock = product.stock - data.quantity;
              if (product.stock < 0)
                throw new HttpError(
                  409,
                  "Validation Error",
                  `Can't reduce product stock below 0!`
                );
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
      console.log(error);
    }
  },
};
