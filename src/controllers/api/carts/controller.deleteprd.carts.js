import { cartService } from "../../../services/cart.services.js";

export async function delPrdInCart(req, res, next) {
  req.logger.http("inside delete some products in cart");
  try {
    const deleter = await cartService.deleteProducts(
      req.params.cid,
      req.params.pid
    );
    res.status(200).json(deleter);
  } catch (error) {
    req.logger.error(`delete somo products in cart fail ${error.message}`);
    return next(error);
  }
}
