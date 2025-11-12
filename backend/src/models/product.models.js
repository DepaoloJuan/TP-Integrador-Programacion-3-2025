import connection from "../api/database/db.js";

/* ===================================================
    GET /products
    Retorna todos los productos desde la base de datos
    =================================================== */

const selectAllProducts = () => {
  const sql = "SELECT * FROM productos";
  return connection.query(sql);
};

export default { selectAllProducts };
