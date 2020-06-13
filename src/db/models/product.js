"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      category: DataTypes.INTEGER,
    },
    { underscored: true }
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      as: "Category",
      foreignKey: "category",
    });
  };
  return Product;
};
