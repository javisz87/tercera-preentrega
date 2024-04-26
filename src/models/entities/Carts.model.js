import { ErrorInvalidArgument } from "../error/errors.model.js";
import { Uid } from "../../utils/UiD.js";

export default class Carts {
  #id;
  #products;

  constructor() {
    this.#id = this.validateId(Uid());
    this.#products = this.validateProducts([]);
  }

  // Validación de id
  validateId(id) {
    if (!id) {
      throw new ErrorInvalidArgument("ID is required");
    }
    return id;
  }

  // Validación de products
  validateProducts(products) {
    if (!Array.isArray(products)) {
      throw new ErrorInvalidArgument("Products must be an array");
    }
    return products;
  }

  //geters

  get id() {
    return this.#id;
  }

  get products() {
    return this.#products;
  }

  // Method to access data without exposing private fields
  dto() {
    return {
      id: this.#id,
      products: this.#products,
    };
  }
}
