import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function deleteAllPrdCart(req, res, next) {
  req.logger.http("inside delete all products in cart");
  try {
    const deleter = await cartRepository.delAllProductsInCart(req.params.cid);
    res.json(deleter);
  } catch (error) {
    req.logger.error(`delete cart fail ${error.message}`);
    return next(error);
  }
}
