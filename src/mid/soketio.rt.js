import { io } from "../app/server.js";
import { userRepository } from "../repositories/users.repository.js";
export async function socketFn(req, res, next) {
  const products = await userRepository.findMany();
  io.emit("reloadProducts", {
    list: products,
    listOk: products.length > 0,
  });
}
