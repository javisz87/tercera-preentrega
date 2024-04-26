import mongoose, { Schema } from "mongoose";
import {
  ErrorInvalidQuantity,
  ErrorNotFound,
} from "../../models/error/errors.model.js";

function toPojo(object) {
  return JSON.parse(JSON.stringify(object));
}

export const SchemaCarts = new Schema(
  {
    id: { type: String, require: true },
    products: {
      type: [
        {
          product: String,
          quantity: Number,
        },
      ],
      default: [],
    },
  },
  { versionKey: false }
);

export default class CartsMongoose {
  #cartsDb;
  constructor() {
    this.#cartsDb = mongoose.model("carts", SchemaCarts);
  }

  async add(element) {
    const pojo = toPojo(await this.#cartsDb.create(element));
    delete pojo._id;
    return pojo;
  }

  async getCartById(cid) {
    const cart = await this.#cartsDb.findOne({ id: cid });
    if (!cart) throw new ErrorNotFound("Cart Not Found");
    return cart;
  }

  async getProductsInCartById(cid) {
    const cart = await this.getCartById(cid)
    const populatedCart = await this.#cartsDb.aggregate([
      {
        $match: { id: cid },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "id",
          as: "product",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          _id: false,
          product: {
            $arrayElemAt: [
              "$product",
              { $indexOfArray: ["$product.id", "$products.product"] },
            ],
          },
          quantity: "$products.quantity",
        },
      },
    ]);

    return populatedCart;
  }

  async addProductInCart(cid, pid, qt) {
    const cart = await this.getCartById(cid);
    const products = cart.products;
    const serchprod = products.find((p) => p.product === pid);
    if (!serchprod) {
      products.push({ product: pid, quantity: qt });
    } else {
      serchprod.quantity += qt;
    }
    await this.#cartsDb.findByIdAndUpdate(cart._id, { products: products });
    return serchprod;
  }

  async delProductInCart(cid, pid) {
    const cart = await this.getCartById(cid);
    const products = cart.products;
    const deleter = products.filter((p) => p.product !== pid);
    await this.#cartsDb.findByIdAndUpdate(cart._id, { products: deleter });
    return deleter;
  }

  async updateCart(cid, updcart) {
    const cart = await this.getCartById(cid);
    const updated = await this.#cartsDb.findByIdAndUpdate(cart._id, {
      products: updcart,
    });
    return updated;
  }

  async updProductInCart(cid, pid, updquantity) {
    const cart = await this.getCartById(cid);
    const products = cart.products;
    const serchprod = products.find((p) => p.product === pid);
    if (!serchprod) {
      throw new ErrorNotFound("Not Found");
    }
    if (isNaN(updquantity.quantity) || updquantity.quantity < 0) {
      throw new ErrorInvalidQuantity("Invalid Quantity");
    }
    serchprod.quantity = updquantity.quantity;
    await this.#cartsDb.findByIdAndUpdate(cart._id, { products: products });
  }

  async delAllProductsInCart(cid) {
    const cart = await this.getCartById(cid);
    await this.#cartsDb.findByIdAndUpdate(cart._id, { products: [] });
    return cart;
  }

  async deleteCart(cid) {
    const cart = await this.getCartById(cid);
    await this.#cartsDb.findByIdAndRemove(cart._id);
  }
}
export const cmg = new CartsMongoose();
