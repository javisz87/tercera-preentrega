import mongoose, { Schema } from "mongoose";
import { DaoMongoose } from "./defaultDaoMongoose.js";

export const SchemaTickets = new mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    puchase_datetime: { type: String, require: true },
    amount: { type: Number, require: true, min: 0 },
    purcheaser: { type: String, required: true },
  },
  { versionKey: false }
);

const ticketModel = mongoose.model("tickets", SchemaTickets);

export const tmg = new DaoMongoose(ticketModel);
