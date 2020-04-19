const logger = require("../../../middlewares/logger");
const sequelize = require("../../../sequelize/sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getUsers = async (req, res, next) => {
  try {
    const {
      limit = 10,
      skip = 0,
      sort = "idUser",
      sortDir = "asc",
      keyword
    } = req.query;
    const { isReturn } = req;
    const query = {
      attributes: { exclude: ["hash"] },
      limit: Number(limit),
      offset: Number(skip),
      order: [[sort, sortDir]]
    };
    if (keyword) {
      query.where = {
        [Op.or]: {
          firstName: { [Op.like]: `%${keyword}%` },
          lastName: { [Op.like]: `%${keyword}%` },
          email: { [Op.like]: `%${keyword}%` }
        }
      };
    }
    const users = await sequelize.Users.findAndCountAll(query);
    logger.info("getUsers success.");
    if (isReturn) {
      return users;
    }
    return res.status(200).send(users);
  } catch (error) {
    logger.error(`Error getting users - ${error}`);
    return next(error);
  }
};

module.exports = {
  handler: getUsers
};
