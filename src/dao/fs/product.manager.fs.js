import fs from "fs/promises";
import { ErrorNotFound } from "../../mid/errors.class";

export default class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async #loadProducts() {
    const json = await fs.readFile(this.#path, "utf-8");
    this.products = JSON.parse(json);
  }

  async #writeProducts() {
    const write = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.#path, write);
  }

  async addProduct(product) {
    await this.#loadProducts();
    const codeValid = this.products.find((e) => e.code === product.code);
    if (codeValid) {
      throw new Error("Product already exist");
    }

    this.products.push(product);
    await this.#writeProducts();
    return product;
  }

  async getProducts() {
    await this.#loadProducts();
    return this.products;
  }

  async getProductById(id) {
    await this.#loadProducts();
    const finder = this.products.find((c) => c.id === id);
    if (!finder) {
      throw new ErrorNotFound("Product Not Found");
    }
    return finder;
  }

  async deleteProduct(id) {
    await this.#loadProducts();
    const finder = this.products.find((c) => c.id === id);
    if (!finder) {
      throw new ErrorNotFound("Product Not Found");
    }
    const deleter = this.products.filter((e) => e.id !== id);
    this.products = deleter;
    await this.#writeProducts();
  }

  async updateProduct(id, productUpd) {
    await this.#loadProducts();
    const updindex = this.products.findIndex((e) => e.id === id);
    if (updindex === -1) {
      throw new ErrorNotFound("Product Not Found");
    }
    const oldproduct = this.products[updindex];
    this.products[updindex] = { ...oldproduct, ...productUpd };
    this.products[updindex].id = id;
    await this.#writeProducts();
    return this.products[updindex];
  }
}

export const pm = new ProductManager("./src/database/productos.json");
