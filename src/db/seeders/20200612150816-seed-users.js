"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync("rahasia", salt);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "codeathome@gmail.com",
          password: password,
          role: "admin",
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
