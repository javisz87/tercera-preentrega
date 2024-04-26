import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function getCart(req, res, next) {
  req.logger.http("inside get a cart");
  try {
    const productosEnCarro = await cartRepository.getProductsInCartById(
      req.params.cid
    );
    res.json(productosEnCarro);
  } catch (error) {
    req.logger.error(`get cart fail ${error.message}`);
    next(error);
  }
}
