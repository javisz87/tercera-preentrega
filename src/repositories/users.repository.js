import { userDao } from "../dao/index.js";
import { DefaultRepository } from "./DefaultRepository.js";

export const userRepository = new DefaultRepository(userDao);
