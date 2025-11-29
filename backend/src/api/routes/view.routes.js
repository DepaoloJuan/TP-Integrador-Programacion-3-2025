import { Router } from "express";
import { vistaProductos } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

const router = Router();

// rutas de las vistas

router.get("/index", vistaProductos);

router.get("/consultar", (req, res) => {
  res.render("get");
});
router.get("/crear", (req, res) => {
  res.render("create");
});

router.get("/modificar", (req, res) => {
  res.render("update");
});

router.get("/eliminar", (req, res) => {
  res.render("delete");
});

router.get("/loggin", (req, res) => {
  res.render("loggin");
});
export default router;
