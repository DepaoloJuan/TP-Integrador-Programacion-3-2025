//importamos el middleware router
import { Router } from "express";

import { validateId } from "../middlewares/middlewares.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  removeProduct,
  updateProduct,
} from "../controllers/product.controllers.js";

const router = Router();

/* ===================================================
   Endpoint GET /products
   Retorna todos los productos desde la base de datos
   =================================================== */
router.get("/", getAllProducts);

/* ===================================================
   GET PRODUCTOS POR ID
   Retorna un producto segun su ID
   =================================================== */

router.get("/:id", validateId, getProductById);

/* ===================================================
    Endpoint POST /products
   =================================================== */
router.post("/", createProduct);

/* ===================================================
   Endpoint DELETE /products/:id
   Elimina un producto según su ID
   =================================================== */

router.delete("/:id", removeProduct);

/* ===================================================
    Endpoint PUT /products
   =================================================== */

router.put("/", updateProduct);

export default router;
