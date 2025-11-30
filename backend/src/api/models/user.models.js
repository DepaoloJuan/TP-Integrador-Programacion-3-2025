
//conexion a la base de datos
import connection from "../database/db.js";


export const credencialesUsuario = (correo, password) => {
  const sql = `SELECT * FROM usuarios WHERE correo = ? AND password = ?`;
  return connection.query(sql, [correo, password]);
}

