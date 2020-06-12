'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    idProduct: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    idCustomer: DataTypes.INTEGER,
    idCart: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};