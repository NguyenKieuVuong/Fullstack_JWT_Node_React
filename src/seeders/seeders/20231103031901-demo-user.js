"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    //Users - nhap ten table
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "JohnDoe@gmail.com1",
          password: "123",
          username: "data fake 1",
        },
        {
          email: "JohnDoe@gmail.com2",
          password: "123",
          username: "data fake 2",
        },
        {
          email: "JohnDoe@gmail.com3",
          password: "123",
          username: "data fake 3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
