const logger = require("../../../middlewares/logger");
const sequelize = require("../../../sequelize/sequelize");
const errorHandler = require("../../../helpers/errorHandler");
const Joi = require("@hapi/joi");
const getUsers = require("./getUsers");

const deleteUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const deletedUser = await sequelize.Users.destroy({
      where: { idUser }
    });
    if (!deletedUser) {
      return next(errorHandler.notFoundError("This user is not found."));
    }
    const users = await getUsers.handler({ ...req, isReturn: true });
    logger.info(req, "User successfully deleted.");
    return res.status(200).send(users);
  } catch (error) {
    logger.error(`Error delete users - ${error}`);
    next(error);
  }
};

const deleteUserValidationSchema = {
  params: {
    idUser: Joi.number().required()
  }
};

module.exports = {
  handler: deleteUser,
  validationSchema: deleteUserValidationSchema
};
