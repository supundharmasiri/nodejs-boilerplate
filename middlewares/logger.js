const { createLogger, transports, format } = require("winston");
const path = require("path");

const logFormat = format.printf(info => {
  return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
});

const logger = createLogger({
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    // Format the metadata object
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Http({
      level: "warn",
      format: format.json()
    }),
    new transports.Console({
      level: "info",
      format: format.combine(format.colorize(), format.simple(), logFormat)
    })
  ]
});

module.exports = logger;
