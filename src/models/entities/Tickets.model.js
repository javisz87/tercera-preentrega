import { ErrorInvalidArgument } from "../error/errors.model.js";
import { Uid } from "../../utils/UiD.js";
import { formatDate } from "../../utils/dateFormater.js";

export default class Tickets {
  #code;
  #puchase_datetime;
  #amount;
  #purcheaser;

  constructor({ amount, purcheaser }) {
    this.#code = this.validateId(Uid());
    this.#puchase_datetime = formatDate(Date.now());
    this.#amount = this.validateamount(amount);
    this.#purcheaser = this.validateEmail(purcheaser);
  }

  // Validaciones
  validateId(id) {
    if (!id) {
      throw new ErrorInvalidArgument("ID is required");
    }
    return id;
  }

  validateamount(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new ErrorInvalidArgument("amount must be a number greater than 0.");
    }
    return amount;
  }

  // Validación de email
  validateEmail(email) {
    if (!email) {
      throw new ErrorInvalidArgument("Email is required");
    }
    return email;
  }

  // Geters

  get code() {
    return this.#code;
  }
  get puchase_datetime() {
    return this.#puchase_datetime;
  }
  get amount() {
    return this.#amount;
  }
  get purcheaser() {
    return this.#purcheaser;
  }

  // Method to access data without exposing private fields
  dto() {
    return {
      code: this.#code,
      puchase_datetime: this.#puchase_datetime,
      amount: this.#amount,
      purcheaser: this.#purcheaser,
    };
  }
}
