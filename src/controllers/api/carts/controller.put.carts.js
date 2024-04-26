import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function putCart(req, res, next) {
  req.logger.http("inside put cart");
  try {
    const productosEnCarro = await cartRepository.updateCart(
      req.params.cid,
      req.body
    );
    res.json(productosEnCarro);
  } catch (error) {
    req.logger.error(`put cart fail ${error.message}`);
    next(error);
  }
}
