//importamos el modulo dotenv
import dotenv from "dotenv";

//configuramos dotenv para que lea el archivo .env
dotenv.config();

//exportamos un objeto con las variables de entorno necesarias de .env
export const env = {
  PORT: process.env.PORT || 3100,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
};

export default env;
