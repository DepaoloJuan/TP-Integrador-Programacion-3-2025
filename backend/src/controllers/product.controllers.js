import connection from "../api/database/db.js";
import ProductModel from "../models/product.models.js";

/* ===================================================
    GET /products
   Retorna todos los productos desde la base de datos
   =================================================== */
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await ProductModel.selectAllProducts();
    res.status(200).json({
      payload: rows,
      message:
        rows.length === 0
          ? "No hay productos disponibles"
          : "Productos obtenidos exitosamente",
    });
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};

/* ===================================================
   GET PRODUCTOS POR ID
   Retorna un producto segun su ID
   =================================================== */
export const getProductById = async (req, res) => {
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
};

/* ===================================================
   CREAR PRODUCTO
   =================================================== */
export const createProduct = async (req, res) => {
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
};

/* ===================================================
    ACTUALIZAR PRODUCTO
    =================================================== */
export const updateProduct = async (req, res) => {
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
};

/* ===================================================
    ELIMINAR PRODUCTO
    =================================================== */
export const deleteProduct = async (req, res) => {
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
};
