import { cartDao } from "../dao/index.js";

export class CartModelRepository {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }

  get dao() {
    return this.#dao;
  }

  add(datac) {
    return this.#dao.add(datac);
  }

  async getCartById(datac) {
    return this.#dao.getCartById(datac);
  }

  async getProductsInCartById(datac) {
    return this.#dao.getProductsInCartById(datac);
  }

  async addProductInCart(datac, datap, dataq) {
    return this.#dao.addProductInCart(datac, datap, dataq);
  }

  async updProductInCart(datac, datap, info) {
    return this.#dao.updProductInCart(datac, datap, info);
  }

  async delProductInCart(datac, datap) {
    return this.#dao.delProductInCart(datac, datap);
  }

  async updateCart(datac, updcart) {
    return this.#dao.updateCart(datac, updcart);
  }

  async delAllProductsInCart(datac) {
    return this.#dao.delAllProductsInCart(datac);
  }

  async deleteCart(datac) {
    return this.#dao.deleteCart(datac);
  }
}

export const cartRepository = new CartModelRepository(cartDao);
