import { Router } from "express";
import {
  cartView,
  chatView,
  forgotView,
  loginView,
  newProductView,
  productView,
  recoverView,
  regisView,
  ticketView,
} from "../../controllers/views/controller.all.views.js";
import { authJwtView } from "../../mid/authentication.js";
import { soloRol } from "../../mid/authorization.js";
import { PATH_CHAT } from "../../config/config.js";
import { mmg } from "../../dao/mongoose/messages.dao.mg.js";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  res.redirect("/login");
});

viewsRouter.get("/newproducts", authJwtView, soloRol("admin"), newProductView);

//vistas de productos paginado
//nota falta ver como hacer para que siempre aparezca en mi url page como req (ver como redirigir)
viewsRouter.get("/products", authJwtView, productView);

//vista de carritos
viewsRouter.get("/carts/:cid", authJwtView, cartView);

//Login
viewsRouter.get("/login", loginView);

//Register
viewsRouter.get("/register", regisView);

//Chat
viewsRouter.get("/chat", soloRol("user"), chatView);

//Ticket

viewsRouter.get("/ticket/:tid", ticketView);

// Forgot password

viewsRouter.get("/forgot", forgotView);

//recover passwors

viewsRouter.get("/recover", recoverView);
