import express from "express";
import { Router } from "express";

import { getProductsMocked } from "../../controllers/api/products/controller.getmock.products.js";

export const mocksRouter = Router();
mocksRouter.use(express.json());
mocksRouter.use(express.urlencoded({ extended: true }));

mocksRouter.get("/", getProductsMocked);
