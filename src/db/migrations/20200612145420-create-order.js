"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      checkout_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Checkouts", // it's table name not model name
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Products", // it's table name not model name
        //   key: "id",
        // },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Orders");
  },
};
