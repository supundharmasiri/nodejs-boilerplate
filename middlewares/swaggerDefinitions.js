const { HOST } = require('../constant');

module.exports = {
  baseDefinitions: {
    info: {
      title: "nodejs-boilerplate",
      version: "2020-04", // Version (required)
      description: "nodejs-boilerplate API Swagger Specification"
    },
    host: HOST,
    schemes: ["http", "https"],
    basePath: "/",
    securityDefinitions: {
      bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    }
  },

  definitions: {
    logging: {
      properties: {
        email: {
          type: "string"
        },
        password: {
          type: "string"
        }
      }
    }
  }
};
