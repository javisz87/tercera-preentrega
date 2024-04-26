import { NODE_ENV } from "../config/config.js";
import winston from "winston";

// solo a modo de referencia por si se decide trabajar con los que vienen por defecto
// levelsWinston {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6,
// }

const myOwnLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  verbose: 5,
  debug: 6,
};

const loggerDev = winston.createLogger({
  levels: myOwnLevels,
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

const loggerProd = winston.createLogger({
  levels: myOwnLevels,
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "error.log",
    }),
    new winston.transports.Console({
      level: "info",
    }),
  ],
});

export let winLogger;
if (NODE_ENV === "production") {
  winLogger = loggerProd;
} else {
  winLogger = loggerDev;
}
