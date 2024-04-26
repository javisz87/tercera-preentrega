import { ErrorInvalidArgument } from "../error/errors.model.js";
import { Uid } from "../../utils/UiD.js";

export default class Products {
  #id;
  #title;
  #description;
  #price;
  #thumbnail;
  #code;
  #stock;
  #status;
  #category;
  #owner;

  constructor({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    owner,
  }) {
    this.#id = Uid();
    this.#title = title;
    this.#description = description;
    this.#price = this.validatePrice(price);
    this.#thumbnail = [this.validateThumbnail(thumbnail)];
    this.#code = this.validateCode(code);
    this.#stock = this.validateStock(stock);
    this.#status = true;
    this.#category = this.validateCategory(category);
    this.#owner = this.validateOwner(owner) ?? "super-admin";
  }

  //validations

  validatePrice(price) {
    if (typeof price !== "number" || price <= 0) {
      throw new ErrorInvalidArgument("Price must be a number greater than 0.");
    }
    return price;
  }

  validateThumbnail(thumbnail) {
    if (typeof thumbnail !== "string") {
      throw new ErrorInvalidArgument(
        "Thumbnail must be a string ending with .jpg or .png."
      );
    }
    return thumbnail;
  }

  validateCode(code) {
    if (typeof code !== "string" || code.length > 7) {
      throw new ErrorInvalidArgument(
        "Code must be a string with a maximum length of 6 characters."
      );
    }
    return code;
  }

  validateStock(stock) {
    if (typeof stock !== "number" || stock <= 0) {
      throw new ErrorInvalidArgument("Stock must be a number greater than 0.");
    }
    return stock;
  }

  validateCategory(category) {
    const allowedCategories = [
      "AFA",
      "CLUBS",
      "+SELECCIONES",
      "RETRO",
      "OTROS",
      "PERLITAS",
    ];
    if (!allowedCategories.includes(category)) {
      throw new ErrorInvalidArgument(
        "Invalid category. Allowed categories: AFA, CLUBS, +SELECCIONES, RETRO, OTROS, PERLITAS."
      );
    }
    return category;
  }

  validateOwner(owner) {
    if (typeof owner !== "string") {
      throw new ErrorInvalidArgument("owner must be a string");
    }
    return owner;
  }
  // Getters
  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get price() {
    return this.#price;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  get code() {
    return this.#code;
  }

  get stock() {
    return this.#stock;
  }

  get status() {
    return this.#status;
  }

  get category() {
    return this.#category;
  }

  get owner() {
    return this.#owner;
  }

  // Method to access data without exposing private fields
  dto() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      price: this.#price,
      thumbnail: this.#thumbnail,
      code: this.#code,
      stock: this.#stock,
      status: this.#status,
      category: this.#category,
      owner: this.#owner,
    };
  }
}
