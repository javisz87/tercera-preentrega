export default class Messages {
  #timestamp;
  #autor;
  #mensaje;

  constructor({ timestamp, autor, mensaje }) {
    this.#timestamp = timestamp;
    this.#autor = autor;
    this.#mensaje = mensaje;
  }

  // Geters
  get timestamp() {
    return this.#timestamp;
  }
  get autor() {
    return this.#autor;
  }
  get mensaje() {
    return this.#mensaje;
  }

  //metodos para acceder a copia y proteger original
  dto() {
    return {
      timestamp: this.#timestamp,
      autor: this.#autor,
      mensaje: this.#mensaje,
    };
  }
}
