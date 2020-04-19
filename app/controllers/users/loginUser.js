const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../../../middlewares/logger");
const sequelize = require("../../../sequelize/sequelize");
const errorHandler = require("../../../helpers/errorHandler");

const getUser = async obj => {
  return await sequelize.Users.findOne({
    where: obj,
    type: Sequelize.QueryTypes.SELECT
  });
};

async function checkUser(user, password, jwtOptions, rememberMe) {
  const match = await bcrypt.compare(password, user.hash);
  if (match) {
    const payload = { idUser: user.idUser };
    const token = jwt.sign(payload, jwtOptions.secretOrKey, {
      expiresIn: rememberMe ? 1440 * 60 * 30 : 1440 * 60 // expires in 1 day or 30 days
    });
    delete user.hash;
    return { message: "success.", token: token, user };
  } else {
    return false;
  }
}

/**
 * User login
 * @param {email, password} req
 * @param {*} res
 * @param {*} next
 */
async function login(req, res, jwtOptions) {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      logger.error(`Trying to login - Username or password is missing`);
      res.status(400).json({ error: "Missing email or password." });
      return;
    }

    let user = await getUser({ email: email });
    if (user) {
      user = user.dataValues;
    } else {
      logger.error(`No user found for ${email}`);
      return res
        .status(401)
        .json(errorHandler.unauthorizedError("No such user found."));
    }
    const response = await checkUser(user, password, jwtOptions, rememberMe);
    if (response) {
      logger.info(`Login success for ${email}`);
      return res.status(200).json(response);
    } else {
      logger.error(`Password is incorrect for ${email}`);
      res
        .status(401)
        .json(errorHandler.unauthorizedError("Password is incorrect."));
    }
  } catch (error) {
    logger.error(`Trying to login : ${error}`);
    return res.status(500).json(errorHandler.internalServerError(error));
  }
}

module.exports = {
  login,
  getUser
};
