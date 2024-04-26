import { userRepository } from "../../../repositories/users.repository.js";

export async function getUsersController(req, res, next) {
  req.logger.http("inside get user");
  const users = await userRepository.findMany();
  res.json(users);
}
