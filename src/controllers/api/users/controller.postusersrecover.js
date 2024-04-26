import { JWT_PRIVATE_KEY } from "../../../config/config.js";
import { userRepository } from "../../../repositories/users.repository.js";
import jwt from "jsonwebtoken";
import { bcCompare, hasher } from "../../../utils/hasher.js";
import { ErrorAuthothentication } from "../../../models/error/errors.model.js";

export async function postUsersRecover(req, res, next) {
  try {
    req.logger.http("inside get  recover-user");
    const user = JSON.parse(
      JSON.stringify(jwt.verify(req.body.token, JWT_PRIVATE_KEY))
    );
    req.logger.info(user);
    const userToUpd = await userRepository.findOne({ email: user.email });
    req.logger.info(userToUpd);
    req.logger.info(bcCompare(req.body.password, userToUpd.password));

    if (bcCompare(req.body.password, userToUpd.password)) {
      throw new ErrorAuthothentication("You must select a new pasword");
    }
    userRepository.updateOne(userToUpd.id, {
      password: hasher(req.body.password),
    });

    res.status(201).json("Success New Password");
  } catch (error) {
    req.logger.error(`post forgotuser fail ${error.message}`);
    next(error);
  }
}
