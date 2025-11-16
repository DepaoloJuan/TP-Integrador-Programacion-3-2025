import connection from "../api/database/db.js";

/* ===================================================
    GET /products
    Retorna todos los productos desde la base de datos
====================================================*/

const selectAllProducts = () => {
  const sql = "SELECT * FROM productos";
  return connection.query(sql);
};

/* ===================================================
   GET PRODUCTOS POR ID
   Retorna un producto segun su ID
====================================================*/

const selectProductWhereId = (id) => {
  let sql = "SELECT * FROM productos WHERE productos.id = ?";
  return connection.query(sql, [id]);
};

/* ===================================================
   CREAR PRODUCTO
====================================================*/
const insertProduct = (nombre, tipo, precio, imagen) => {
  let sql =
    "INSERT INTO productos (nombre, tipo, precio, imagen) VALUES (?, ?, ?, ?)";
  return connection.query(sql, [nombre, tipo, precio, imagen]);
};

/* ===================================================
   ACTUALIZAR PRODUCTO
====================================================*/

const updateProduct = (nombre, imagen, tipo, precio, activo, id) => {
  let sql = `
      UPDATE productos
      SET nombre = ?, imagen = ?, tipo = ?, precio = ?, activo = ?
      WHERE id = ?
    `;

  return connection.query(sql, [nombre, imagen, tipo, precio, activo, id]);
};

/* ===================================================
   ELIMINAR PRODUCTO
====================================================*/
const deleteProduct = (id) => {
  let sql = "DELETE FROM productos WHERE id = ?";
  return connection.query(sql, [id]);
};

export default {
  selectAllProducts,
  selectProductWhereId,
  insertProduct,
  updateProduct,
  deleteProduct,
};
