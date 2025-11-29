// Importamos el middleware Router
import { Router } from "express";

import { createTicket } from "../controllers/ticket.controllers.js";

const router = Router();

/* ===================================================
   Endpoint POST /tickets
   Crea un nuevo ticket de compra
====================================================*/
router.post("/", createTicket);

export default router;
