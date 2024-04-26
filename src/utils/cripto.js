import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../config/config.js";

export function encriptarJWT(payload) {
  const token = jwt.sign(JSON.parse(JSON.stringify(payload)), JWT_PRIVATE_KEY, {
    expiresIn: "1h",
  });
  return token;
}
