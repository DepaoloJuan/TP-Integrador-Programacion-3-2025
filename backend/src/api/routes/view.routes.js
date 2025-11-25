import { Router } from "express";
import productModels from "../models/product.models.js";

const router = Router();

// rutas de las vistas

router.get("/index", async (req, res) => {
  try {
    const [rows] = await productModels.selectAllProducts();
    res.render("index", {
      productos: rows,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});
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

export default router;
