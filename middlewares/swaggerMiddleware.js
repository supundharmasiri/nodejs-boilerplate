const swaggerJsdoc = require("swagger-jsdoc");
const { baseDefinitions, definitions } = require("./swaggerDefinitions");
const options = {
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: [`${__dirname}/../../index.js`],
  basePath: "/",
  swaggerDefinition: baseDefinitions
};

const specs = swaggerJsdoc(options);
specs.definitions = definitions;
module.exports = {
  specs
};
