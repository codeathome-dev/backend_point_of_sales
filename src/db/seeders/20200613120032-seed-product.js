"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Algoritma dan pemogaraman",
          description: "Belajar membuat design yang baik",
          image: "images/cover-algoritma-dan-pemrograman",
          price: 200000,
          stock: 100,
          category: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-android.png",
          price: 400000,
          stock: 900,
          category: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-angular.png",
          price: 400000,
          stock: 900,
          category: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-html.png",
          price: 400000,
          stock: 900,
          category: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-laravel.png",
          price: 400000,
          stock: 900,
          category: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-pgp.png",
          price: 400000,
          stock: 900,
          category: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-android.png",
          price: 400000,
          stock: 900,
          category: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-android.png",
          price: 400000,
          stock: 900,
          category: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "MERN Stack",
          description: "Fullstack Javascript",
          image: "images/cover-android.png",
          price: 400000,
          stock: 900,
          category: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
