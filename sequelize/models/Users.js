module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    idUser: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    hash: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    idUserRole: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lastLoggedIn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: () => new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: () => new Date()
    }
  });

  Users.associate = function(models) {
    Users.belongsTo(models.UserRoles, {
      foreignKey: "idUserRole"
    });
  };

  return Users;
};
