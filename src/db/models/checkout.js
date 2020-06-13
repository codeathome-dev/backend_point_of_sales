"use strict";
module.exports = (sequelize, DataTypes) => {
  const Checkout = sequelize.define(
    "Checkout",
    {
      amount: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      receipt: DataTypes.STRING,
    },
    { underscored: true }
  );
  Checkout.associate = function (models) {
    // associations can be defined here
    Checkout.belongsTo(models.User, { as: "User", foreignKey: "user_id" });
    Checkout.hasMany(models.Order);
  };
  return Checkout;
};
