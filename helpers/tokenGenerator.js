"use strict";

const jwt = require("jsonwebtoken");
const { SECRET } = require("../constant");

function tokenGenerator(payload, expiresIn = 900) {
  const token = jwt.sign(payload, SECRET, {
    expiresIn: expiresIn
  });
  return token;
}

module.exports = {
  tokenGenerator
};
