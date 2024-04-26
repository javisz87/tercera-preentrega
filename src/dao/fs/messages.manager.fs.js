import fs from "fs/promises";

export class MesaggesManager {
  #msg;
  #ruta;

  constructor(ruta) {
    this.#ruta = ruta;
    this.#msg = [];
  }

  async #leer() {
    const json = await fs.readFile(this.#ruta, "utf-8");
    this.#msg = JSON.parse(json);
  }

  async #escribir() {
    const nuevoJson = JSON.stringify(this.#msg, null, 2);
    await fs.writeFile(this.#ruta, nuevoJson);
  }

  async saveMsg(messa) {
    await this.#leer();
    this.#msg.push(messa);
    await this.#escribir();
    return messa;
  }

  async findMsg() {
    await this.#leer();
    return this.#msg;
  }

  async findMsgById(id) {
    await this.#leer();
    const buscada = this.#msg.find((c) => c.id === id);
    if (!buscada) {
      throw new Error("id no encontrado");
    }
    return buscada;
  }

  async updateMsg(id, nuevaCosa) {
    await this.#leer();
    const indiceBuscado = this.#msg.findIndex((c) => c.id === id);
    if (indiceBuscado === -1) {
      throw new Error("id no encontrado");
    }
    this.#msg[indiceBuscado] = nuevaCosa;
    await this.#escribir();
    return nuevaCosa;
  }

  async deleteMsg(id) {
    await this.#leer();
    const indiceBuscado = this.#msg.findIndex((c) => c.id === id);
    if (indiceBuscado === -1) {
      throw new Error("id no encontrado");
    }
    const [borrado] = this.#msg.splice(indiceBuscado, 1);
    await this.#escribir();
    return borrado;
  }

  async reset() {
    this.#msg = [];
    await this.#escribir();
  }
}

export const mm = new MesaggesManager("./src/database/messages.json");
