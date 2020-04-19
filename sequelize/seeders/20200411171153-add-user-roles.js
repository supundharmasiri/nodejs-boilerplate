"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return queryInterface.bulkInsert(
        "UserRoles",
        [
          {
            idUserRole: 1,
            UserRole: "Super Admin",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            idUserRole: 2,
            UserRole: "Admin",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            idUserRole: 3,
            UserRole: "user",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    } catch (error) {
      console.error("error add-user-roles.js seeder:{name: ", error);
    }
  },

  down: (queryInterface, Sequelize) => {}
};
