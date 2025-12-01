
// importamos mysql2 para manejar la conexion a la base de datos
import mysql from "mysql2/promise";

// importamos las variables de entorno
import environments from "../config/environments.js";

// extraemos la configuracion de la base de datos
const { database } = environments;

// creamos la conexion a la base de datos
const connection = mysql.createPool({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.name,
});

export default connection;
