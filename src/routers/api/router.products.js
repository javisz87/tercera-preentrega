import express from "express";
import { Router } from "express";

import { postProductController } from "../../controllers/api/products/controller.post.products.js";
import { getProductsController } from "../../controllers/api/products/controller.getall.products.js";
import { getProductCodeController } from "../../controllers/api/products/controller.getbycode.products.js";
import { getProductIdController } from "../../controllers/api/products/controllet.getany.products.js";
import { updateProduct } from "../../controllers/api/products/controllet.put.products.js";
import { deleteProduct } from "../../controllers/api/products/controllet.delete.products.js";

export const producstRouter = Router();
producstRouter.use(express.json());
producstRouter.use(express.urlencoded({ extended: true }));

//agregar products a la persistencia en archivo desde el servidor

producstRouter.post("/", postProductController);

// consultar productos todos o con limite desde el servidor

producstRouter.get("/", getProductsController);

//obtener productos por code
producstRouter.get("/code/:pcd", getProductCodeController);

//obtener producto por ID

producstRouter.get("/:pid", getProductIdController);

//editar un producto
producstRouter.put("/:pid", updateProduct);

//eliminar un producto
producstRouter.delete("/:pid", deleteProduct);
