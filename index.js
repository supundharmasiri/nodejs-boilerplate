"use strict";

const app = require("express")();
const http = require("http");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const errorHandler = require("./helpers/errorHandler");
const logger = require("./middlewares/logger");
const models = require("./sequelize/sequelize");
const routes = require("./app/routes");

const { NODE_ENV, PORT = 4000 } = process.env;
const { ExtractJwt } = passportJWT;
const { specs } = require("./middlewares/swaggerMiddleware");
const { login, getUser } = require("./app/controllers/users/loginUser");
const { SECRET } = require("./constant");

const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = SECRET;

http.globalAgent.keepAlive = true;

const strategy = new JwtStrategy(jwtOptions, async function(jwtPayload, next) {
  if (!jwtPayload.idUser) {
    return next(null, false);
  }
  var expirationDate = new Date(jwtPayload.exp * 1000);
  if (expirationDate < new Date()) {
    return next(null, false);
  }
  let user = await getUser({ idUser: jwtPayload.idUser });
  if (user) {
    user = user.dataValues;
    delete user.hash;
    next(null, user);
  } else {
    next(null, false);
  }
});

models.sequelize
  .sync()
  .then(() => {
    logger.info("Nice! Database looks fine");
  })
  .catch(err => {
    logger.error(err, "Something went wrong with the Database Update!");
  });

passport.use(strategy);
app.use(passport.initialize());
app.use(cors());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/check", (req, res) => {
  try {
    res.send({
      uptime: Math.round(process.uptime()),
      message: "OK",
      timestamp: Date.now()
    });
  } catch (e) {
    res.status(503).end();
  }
});

app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *       - Logging
 *      summary: Logging.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            $ref: '#/definitions/logging'
 *      responses:
 *        200:
 *          description: Returns success.
 */
app.post("/login", (req, res) => {
  login(req, res, jwtOptions);
});

app.use(passport.authenticate("jwt", { session: false }));

app.use("/app", routes);

app.use(function(err, req, res) {
  if (err && err.name === "UnauthorizedError") {
    // log unauthorized requests
    res.status(401).end();
  }
  if (err.status) {
    return res.status(err.status || 500).send(err);
  } else {
    err = errorHandler.internalServerError(err);
    return res.status(err.status || 500).send(err);
  }
});

if (NODE_ENV !== "test") {
  (async () => {
    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
  })();
}

module.exports = app;
