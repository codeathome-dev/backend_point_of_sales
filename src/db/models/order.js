"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      checkout_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.Checkout, {
      as: "Checkout",
      foreignKey: "checkout_id",
    });
    Order.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "product_id",
    });
  };
  return Order;
};
