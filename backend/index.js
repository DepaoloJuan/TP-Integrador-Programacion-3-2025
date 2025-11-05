
import express from "express"; // Nos ayuda a crear servidores localmente
import environments from "./src/api/config/environments.js"; // Variables de entorno
import connection from "./src/api/database/db.js";
import cors from "cors"; // Permite que el front haga peticiones al back

const app = express(); // Crea una instancia de Express.
const PORT = environments.PORT; // Guarda el puerto donde va a escuchar el servidor.

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json()); //trasnformar el json del post a objeto de js

// Endpoint
app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

// iniciamos el servidor
app.listen(PORT, () => { // Pone al servidor a escuchar peticiones en el puerto indicado.
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

//Get product by id

app.get("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
    let [rows] = await connection.query(sql, [id]);
    res.status(200).json({
      payload: rows,
    });
  } catch (error) {
    console.error("Error al obtener producto por ID:", error.message);
    res.status(500).json({
      message: "Error al obtener producto por ID",
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    let { nombre, tipo, precio, imagen } = req.body;
    let sql =
      "INSERT INTO productos (nombre, tipo, precio, imagen) VALUES (?, ?, ?, ?)";
    let [rows] = await connection.query(sql, [nombre, tipo, precio, imagen]);
    res.status(201).json({
      message: "Producto creado exitosamente",
      productId: rows.insertId,
    });
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    res.status(500).json({
      message: "Error al crear producto",
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let sql = "DELETE FROM productos WHERE id = ?";
    let [result] = await connection.query(sql, [id]);
    return res.status(200).json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error.message);
    res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
});

//modificar producto
app.put("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { nombre, tipo, precio, imagen } = req.body;
    let sql =
      "UPDATE productos SET nombre = ?, tipo = ?, precio = ?, imagen = ? WHERE id = ?";
    let [result] = await connection.query(sql, [
      nombre,
      tipo,
      precio,
      imagen,
      id,
    ]);
    return res.status(200).json({
      message: "Producto modificado exitosamente",
    });
  } catch (error) {
    console.error("Error al modificar producto:", error.message);
    res.status(500).json({
      message: "Error al modificar producto",
    });
  }
});

export default app;
