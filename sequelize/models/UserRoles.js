module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define("UserRoles", {
    idUserRole: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserRole: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  });

  UserRoles.associate = function(models) {
    UserRoles.hasMany(models.Users, {
      foreignKey: "idUserRole"
    });
  };

  return UserRoles;
};
