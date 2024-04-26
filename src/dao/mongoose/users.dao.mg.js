import mongoose, { Schema } from "mongoose";
import { DaoMongoose } from "./defaultDaoMongoose.js";

export const SchemaUsers = new mongoose.Schema(
  {
    id: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super-admin", "admin", "user"],
      default: "user",
    },
    cart: { type: String, require: true },
  },
  { versionKey: false }
);

const userModel = mongoose.model("users", SchemaUsers);

export const umg = new DaoMongoose(userModel);
