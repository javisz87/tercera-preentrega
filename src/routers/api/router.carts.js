import express from "express";
import { Router } from "express";
import { postCart } from "../../controllers/api/carts/controller.post.cart.js";
import { getCart } from "../../controllers/api/carts/controller.get.carts.js";
import { postPdrInCart } from "../../controllers/api/carts/controller.postprd.carts.js";
import { delPrdInCart } from "../../controllers/api/carts/controller.deleteprd.carts.js";
import { putCart } from "../../controllers/api/carts/controller.put.carts.js";
import { putPrdCart } from "../../controllers/api/carts/controller.putprd.carts.js";
import { deleteAllPrdCart } from "../../controllers/api/carts/controller.delete.carts.js";

export const cartsRouter = Router();
cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

//creo un carrito
cartsRouter.post("/", postCart);

//muestro un carrito
cartsRouter.get("/:cid", getCart);

//le cargo productos al carrito con su cantidad
cartsRouter.post("/:cid/product/:pid", postPdrInCart);

//elimino un producto de un carrito
cartsRouter.delete("/:cid/product/:pid", delPrdInCart);

//actualizo un carrito
cartsRouter.put("/:cid", putCart);

//actualizo la cantidad de un producto en un carrito
cartsRouter.put("/:cid/product/:pid", putPrdCart);

//elimino todos los productos de un carrito
cartsRouter.delete("/:cid", deleteAllPrdCart);
