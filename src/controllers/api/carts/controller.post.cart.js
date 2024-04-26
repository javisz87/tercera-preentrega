import Carts from "../../../models/entities/carts.model.js";
import { cartRepository } from "../../../repositories/cart.repositrie.js";

export async function postCart(req, res, next) {
  req.logger.http("inside post a cart");
  try {
    const newcart = new Carts();
    const agregada = await cartRepository.add(newcart);
    res.json(agregada);
  } catch (error) {
    req.logger.error(`post cart fail ${error.message}`);
    next(error);
  }
}
