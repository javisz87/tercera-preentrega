import { ErrorInvalidArgument } from "../error/errors.model.js";
import { Uid } from "../../utils/UiD.js";
import { hasher } from "../../utils/hasher.js";

export default class Users {
  #id;
  #email;
  #first_name;
  #last_name;
  #age;
  #password;
  #role;
  #cart;

  constructor({
    id = Uid(),
    email,
    first_name,
    last_name,
    age,
    password,
    role = "user",
    cart,
  }) {
    this.#id = this.validateId(id);
    this.#email = this.validateEmail(email);
    this.#first_name = this.validateFirstName(first_name);
    this.#last_name = this.validateLastName(last_name);
    this.#age = this.validateAge(age);
    this.#password = this.validatePassword(hasher(password));
    this.#role = this.validateRole(role);
    this.#cart = this.validateCart(cart);
  }

  // Validaciones

  // Validación de id
  validateId(id) {
    if (!id) {
      throw new ErrorInvalidArgument("ID is required");
    }
    return id;
  }

  // Validación de email
  validateEmail(email) {
    if (!email) {
      throw new ErrorInvalidArgument("Email is required");
    }
    return email;
  }

  // Validación de first_name
  validateFirstName(first_name) {
    if (!first_name) {
      throw new ErrorInvalidArgument("First name is required");
    }
    return first_name;
  }

  // Validación de last_name
  validateLastName(last_name) {
    if (!last_name) {
      throw new ErrorInvalidArgument("Last name is required");
    }
    return last_name;
  }

  // Validación de age
  validateAge(age) {
    if (!age) {
      throw new ErrorInvalidArgument("Age is required");
    }
    if (typeof age !== "number") {
      throw new ErrorInvalidArgument("Age must be a number");
    }
    if (age < 14) {
      throw new ErrorInvalidArgument("Age must be at least 14");
    }
    return age;
  }

  // Validación de password
  validatePassword(password) {
    if (!password) {
      throw new ErrorInvalidArgument("Password is required");
    }
    return password;
  }

  // Validación de role
  validateRole(role) {
    const validRoles = ["super-admin", "admin", "user"];
    if (!validRoles.includes(role)) {
      throw new ErrorInvalidArgument("Invalid role");
    }
    return role;
  }

  // Validación de cart
  validateCart(cart) {
    if (!cart) {
      throw new ErrorInvalidArgument("cart is required");
    }
    return cart;
  }

  // Getters

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get first_name() {
    return this.#first_name;
  }

  get last_name() {
    return this.#last_name;
  }

  get age() {
    return this.#age;
  }

  get password() {
    return this.#password;
  }

  get role() {
    return this.#role;
  }

  get cart() {
    return this.#cart;
  }

  // Method to access data without exposing private fields

  dto() {
    return {
      id: this.#id,
      email: this.#email,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age,
      password: this.#password,
      role: this.#role,
      cart: this.#cart,
    };
  }

  dtoclose() {
    return {
      email: this.#email,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age,
      role: this.#role,
    };
  }
}
