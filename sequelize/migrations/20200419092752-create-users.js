module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Users", {
      idUser: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      },
      hash: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      idUserRole: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      lastLoggedIn: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: () => new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: () => new Date()
      }
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable("Users")
};
