import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { DaoMongoose } from "./defaultDaoMongoose.js";

export const SchemaProduts = new mongoose.Schema(
  {
    id: { type: String, require: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnail: { type: Array, required: true },
    code: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //   validator: function (value) {
      //     return value.length <= 7;
      //   },
      //   message: "Code must not exceed 7 characters.",
      // },
    },
    stock: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Category 1", "Category 2", "Category 3"],
    },
    owner: { type: String, required: true, default:'super-admin' },
  },
  { versionKey: false }
);

SchemaProduts.plugin(mongoosePaginate);

const productModel = mongoose.model("products", SchemaProduts);

export const pmg = new DaoMongoose(productModel);
