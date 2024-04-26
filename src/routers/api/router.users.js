import { Router } from "express";
import { postUsuarios } from "../../controllers/api/users/controller.post.users.js";
import { getUsersController } from "../../controllers/api/users/controller.getusers.js";
import { authJwtApi } from "../../mid/authentication.js";
import { soloRol } from "../../mid/authorization.js";
import { postUsersForgot } from "../../controllers/api/users/controller.postusersforgot.js";
import { postUsersRecover } from "../../controllers/api/users/controller.postusersrecover.js";
import { getUsersAdm } from "../../controllers/api/users/controller.getuseradm.js";

export const usersRouter = Router();

usersRouter.post("/", postUsuarios);
usersRouter.get("/", authJwtApi, soloRol("super-admin"), getUsersController);
usersRouter.post("/forgot", postUsersForgot);
usersRouter.post("/recover", postUsersRecover);
usersRouter.get("/admin/:uid", authJwtApi, soloRol("super-admin"), getUsersAdm);
