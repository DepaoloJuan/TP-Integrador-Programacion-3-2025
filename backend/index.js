// importamos las funciones necesarias de express
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";
const app = express();

const PORT = environments.PORT;

// Middleware para habilitar CORS
app.use(cors());

// Endpoint
app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

// iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/* ===================================================
   Endpoint GET /products
   Retorna todos los productos desde la base de datos
   =================================================== */
app.get("/products", async (req, res) => {
  try {
    const sql = "SELECT * FROM productos";
    const [rows] = await connection.query(sql);
    res.status(200).json({
      payload: rows,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
});

export default app;
