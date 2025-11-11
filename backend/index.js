import express from "express"; // Nos ayuda a crear servidores localmente
import environments from "./src/api/config/environments.js"; // Variables de entorno
import connection from "./src/api/database/db.js";
import cors from "cors"; // Permite que el front haga peticiones al back
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { validateId } from "./src/api/middlewares/middlewares.js";

const app = express(); // Crea una instancia de Express.
const PORT = environments.PORT; // Guarda el puerto donde va a escuchar el servidor.

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json()); //trasnformar el json del post a objeto de js
app.use(loggerUrl);

// Endpoint
app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

// iniciamos el servidor
app.listen(PORT, () => {
  // Pone al servidor a escuchar peticiones en el puerto indicado.
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

/* ===================================================
   GET PRODUCTOS POR ID
   Retorna un producto segun su ID
   =================================================== */

app.get("/products/:id", validateId, async (req, res) => {
  try {
    let { id } = req.params;
    let sql = "SELECT * FROM productos WHERE productos.id = ?";

    //limitar resultados de la consulta

    let [rows] = await connection.query(sql, [id]);
    // comprobar si existe el producto con el id
    if (rows.length === 0) {
      return res.status(404).json({
        message: `No se encontró ningún producto con el ID ${id}`,
      });
    }

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

/* ===================================================
    Endpoint POST /products
   =================================================== */
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

/* ===================================================
   Endpoint DELETE /products/:id
   Elimina un producto según su ID
   =================================================== */

app.delete("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let sql = "DELETE FROM productos WHERE id = ?";
    let [result] = await connection.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró el producto con id ${id}`,
      });
    }
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

/* ===================================================
    Endpoint PUT /products
   =================================================== */

app.put("/products", async (req, res) => {
  try {
    let { id, name, image, type, price, active } = req.body;

    // ============================================================
    //  Optimización 1: Validación básica de datos recibidos
    // ============================================================
    if (!id || !name || !image || !type || !price || active === undefined) {
      return res.status(400).json({
        message: "Faltan campos requeridos o valores inválidos",
      });
    }

    // ============================================================
    //  Query SQL parametrizada
    // ============================================================
    let sql = `
      UPDATE productos
      SET nombre = ?, imagen = ?, tipo = ?, precio = ?, activo = ?
      WHERE id = ?
    `;

    let [result] = await connection.query(sql, [
      name,
      image,
      type,
      price,
      active,
      id,
    ]);

    console.log(result);

    // ============================================================
    //  Optimización 2: Verificamos si se actualizó algún registro
    // ============================================================
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `No se encontró el producto con id ${id} o no hubo cambios`,
      });
    }

    // ============================================================
    //  Respuesta final OK
    // ============================================================
    res.status(200).json({
      message: `Producto con id ${id} actualizado correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar productos:", error.message);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

export default app;
