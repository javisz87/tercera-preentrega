import { Router } from "express";

import {
  handleGet,
  handlePost,
  handlePut,
} from "../../controllers/api/tickets/controller.all.ticket.js";

export const ticketsRouter = Router();

ticketsRouter.get("/:id?", handleGet);
ticketsRouter.post("/", handlePost);
ticketsRouter.put("/:id", handlePut);
