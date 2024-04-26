import { cartService } from "../../../services/cart.services.js";

export async function postPdrInCart(req, res, next) {
  req.logger.http("inside post products in cart");
  try {
    const product = await cartService.chargeProducts(
      req.params.cid,
      req.params.pid,
      req.query.quantity
    );
    res.status(201).json(product);
  } catch (error) {
    req.logger.error(`post product in cart fail ${error.message}`);
    next(error);
  }
}
