'use strict';

const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");

const errorHandler = require("./helpers/error-handler");
const logger = require("./middlewares/logger");

const { NODE_ENV, PORT = 4000 } = process.env;
const { ExtractJwt } = passportJWT;
const { specs } = require("./middlewares/swaggerMiddleware");

const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'HE.6LMkK{@b3f/X$M/y?^{PXn=(S2p$y';

http.globalAgent.keepAlive = true;

const strategy = new JwtStrategy(jwtOptions, async function (jwtPayload, next) {
  if (!jwtPayload.idUser) {
    return next(null, false);
  }
  let user = {};
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
app.use(passport.initialize());
app.use(cors());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/check', (req, res) => {
  try {
    res.send({
      uptime: Math.round(process.uptime()),
      message: 'OK',
      timestamp: Date.now(),
    });
  } catch (e) {
    res.status(503).end();
  }
});

app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use(function (err, req, res, next) {
  if (err.status) {
    return res.status(err.status || 500).send(err);
  } else {
    err = errorHandler.internalServerError(err);
    return res.status(err.status || 500).send(err);
  }
});

if (NODE_ENV !== 'test') {
  (async () => {
    app.listen(PORT, () => {
      logger.info(`Server listening on http://localhost:${PORT}`);
    });
  })();
}

module.exports = app;
