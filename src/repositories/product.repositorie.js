import { productDao } from "../dao/index.js";
import { DefaultRepository } from "./DefaultRepository.js";

export const productsRepository = new DefaultRepository(productDao);
