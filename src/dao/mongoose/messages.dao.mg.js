import mongoose from "mongoose";

export const SchemaMessages = new mongoose.Schema(
  {
    timestamp: { type: Number, required: true },
    autor: { type: String, required: true },
    mensaje: { type: String, required: true },
  },
  { versionKey: false }
);

export class MesaggesMongoose {
  #messagesDb;
  constructor(ruta) {
    this.#messagesDb = mongoose.model("messages", SchemaMessages);
  }

  async saveMsg(messa) {
    const msgsave = await this.#messagesDb.create(messa);
    return msgsave;
  }

  async findMsg() {
    const msgDisp = await this.#messagesDb.find().lean();
    return msgDisp;
  }

  async reset() {
    this.#messagesDb.deleteMany();
  }
}

export const mmg = new MesaggesMongoose();
