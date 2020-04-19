"use strict";

const { hashPassword } = require("../../helpers/common");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return queryInterface.bulkInsert(
        "Users",
        [
          {
            idUser: 1,
            firstName: "Supun",
            lastName: "Dharmasiri",
            email: "admin@gmail.com",
            phoneNumber: "0111234567",
            hash: await hashPassword("pwd"),
            idUserRole: 1,
            lastLoggedIn: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            idUser: 2,
            firstName: "Supun",
            lastName: "Dharmasiri",
            email: "supun@gmail.com",
            phoneNumber: "011765432",
            hash: await hashPassword("123"),
            idUserRole: 2,
            lastLoggedIn: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            idUser: 3,
            firstName: "Supun",
            lastName: "Dharmasiri",
            email: "supun123@gmail.com",
            phoneNumber: "011234576",
            hash: await hashPassword("123"),
            idUserRole: 3,
            lastLoggedIn: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    } catch (error) {
      console.error("error add-users.js seeder: ", error);
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
