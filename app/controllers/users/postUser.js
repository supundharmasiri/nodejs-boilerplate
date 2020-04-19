const Joi = require("@hapi/joi");
const logger = require("../../../middlewares/logger");
const sequelize = require("../../../sequelize/sequelize");
const errorHandler = require("../../../helpers/errorHandler");
const { hashPassword } = require("../../../helpers/common");

const postUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const existUser = await sequelize.Users.findOne({
      where: { email: userData.email }
    });
    if (existUser) {
      return next(
        errorHandler.invalidRequestError(
          "Email already exists. Try again with a different email."
        )
      );
    }

    userData.hash = await hashPassword(userData.password);

    userData.lastLoggedIn = Date();
    delete userData.password;
    const newUser = await sequelize.Users.create(userData);
    delete newUser.hash;
    logger.info(req, "User successfully added.");
    return res.status(200).send(newUser);
  } catch (error) {
    logger.error(`Error adding users - ${error}`);
    next(error);
  }
};

const postUserValidationSchema = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().required(),
      idUserRole: Joi.number()
    })
    .unknown(true)
};

module.exports = {
  handler: postUser,
  validationSchema: postUserValidationSchema
};
