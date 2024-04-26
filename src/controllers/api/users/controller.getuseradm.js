import { ErrorInvalidArgument } from "../../../models/error/errors.model.js";
import { userRepository } from "../../../repositories/users.repository.js";

export async function getUsersAdm(req, res, next) {
  req.logger.http("inside get-admin user");
  try {
    const user = await userRepository.findOneById(req.params.uid);
    if (user.role === "super-admin")
      throw new ErrorInvalidArgument("user role couldnt  change");
    let userRole;
    if (user.role === "admin") {
      userRole = await userRepository.updateOne(user.id, { role: "user" });
    } else {
      userRole = await userRepository.updateOne(user.id, { role: "admin" });
    }

    res.json(userRole);
  } catch (error) {
    next(error);
  }
}
