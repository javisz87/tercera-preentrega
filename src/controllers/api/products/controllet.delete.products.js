import { pmg } from "../../../dao/mongoose/product.dao.mg.js";
import { socketFn } from "../../../mid/soketio.rt.js";
import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function deleteProduct(req, res, next) {
  req.logger.http("inside delete products");
  try {
    await productsRepository.deleteOne(req.params.pid);
    await socketFn();
    res.sendStatus(204);
  } catch (error) {
    req.logger.error(`delete product fail ${error.message}`);
    next(error);
  }
}
