"use strict";

const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../constant");

async function hashPassword(password) {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUND, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

/**
 * Get uniq values in array
 * @param {Required} array
 * @param {Not Required. This is for object arrays.} key
 */
function onlyUnique(array, key) {
  if (key) {
    return array.reduce(
      (acc, cur) => [...acc.filter(obj => obj[key] !== cur[key]), cur],
      []
    );
  }
  return array.filter((value, index, self) => self.indexOf(value) === index);
}

module.exports = {
  hashPassword,
  onlyUnique
};
