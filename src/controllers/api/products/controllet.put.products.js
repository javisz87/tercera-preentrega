import { socketFn } from "../../../mid/soketio.rt.js";
import { productsRepository } from "../../../repositories/product.repositorie.js";

export async function updateProduct(req, res, next) {
  req.logger.http("inside put products");
  let upd;
  try {
    upd = { ...req.body };
  } catch (error) {
    return next(error);
  }
  try {
    const actualizada = await productsRepository.updateOne(req.params.pid, upd);
    await socketFn();
    res.json(actualizada);
  } catch (error) {
    req.logger.error(`put product fail ${error.message}`);
    next(error);
  }
}
