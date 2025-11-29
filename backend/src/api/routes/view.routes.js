import { Router } from "express";
import { vistaProductos } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

// rutas de las vistas

router.get("/index", requireLogin, vistaProductos);

router.get("/consultar", requireLogin, (req, res) => {
  res.render("get");
});

router.get("/crear", requireLogin, (req, res) => {
  res.render("create");
});

router.get("/modificar", requireLogin, (req, res) => {
  res.render("update");
});

router.get("/eliminar", requireLogin, (req, res) => {
  res.render("delete");
});

router.get("/loggin", (req, res) => {
  res.render("loggin");
});
export default router;
