
import { Router } from "express";
import { loggin } from "../controllers/autenticacion.controllers.js"; //importamos el controlador

const router = Router();

router.post("/loggin", loggin);

export default router;