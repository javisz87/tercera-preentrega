// Libery
import express from "express";
import { engine } from "express-handlebars";
import { Server as socketIOServer } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

// root
import { apiRouter } from "../routers/api/router.api.js";
import { viewsRouter } from "../routers/web/router.views.js";

// config
import { PORT } from "../config/config.js";
import { COOKIE_KEY } from "../config/config.js";

// mid
import { apiErrorHandler } from "../mid/error.handler.js";
import { socketFn } from "../mid/soketio.rt.js";
import { socketChat } from "../mid/socketio.chat.js";
import { logger } from "../mid/loggermid.js";

// DDBB
import { conectar } from "../dao/mongoose/mongoose.js";

// Auth
import session from "../mid/session.js";
import { passportInitialize } from "../mid/authentication.js";

// logger
import { winLogger } from "../utils/logger.js";
import winston from "winston/lib/winston/config/index.js";

const app = express();

await conectar();

app.use(cors({ origin: "*" }));
app.use("/public", express.static("public"));

app.use(logger);

app.use(cookieParser(COOKIE_KEY));
app.use(session);
app.use(passportInitialize);

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use("/api", apiRouter);
app.use("/", viewsRouter);
app.use(apiErrorHandler);

const httpServer = app.listen(PORT, () => {
  winLogger.verbose(`🌙 App listening on port ${PORT}`);
  winLogger.verbose("🌙 Path to login view: http://localhost:8080/");
});

export const io = new socketIOServer(httpServer);

io.on("connection", async (clientSocket) => {
  winLogger.verbose(`New client connection: ${clientSocket.id}`);
  await socketChat(clientSocket);
  await socketFn();
});
