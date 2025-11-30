import express from "express"; // Nos ayuda a crear servidores localmente
import environments from "./src/api/config/environments.js"; // Variables de entorno

import cors from "cors"; // Permite que el front haga peticiones al back
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import {
  productRoutes,
  viewRoutes,
  ticketRoutes,
} from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import authRoutes from "./src/api/routes/autenticacion.routes.js";
import connection from "./src/api/database/db.js";
import session from "express-session";

const app = express(); // Crea una instancia de Express.
const PORT = environments.PORT; // Guarda el puerto donde va a escuchar el servidor.
const SESSION_KEY = environments.SESSION_KEY;

// Configuracion de la session
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json()); //trasnformar el json del post a objeto de js
app.use(loggerUrl);

app.use(express.urlencoded({ extended: true })); //para que transforme y entienda los datos que vienen de un formulario

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Vamos a construir la ruta relativa para servir los archivos de la carpeta /public

app.use("/api/tickets", ticketRoutes); // Rutas para tickets

/*=====================
    Configuracion
====================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto

/*==================
    Rutas
==================*/

// Endpoint que no devuelve ninguna respuesta y queda la llamada colgada y la conexion sin terminar
app.get("/test", (req, res) => {
  console.log(
    "Este endpoint no ofrece ninguna respuesta y se queda aca trabado..."
  );
});

// iniciamos el servidor
app.listen(PORT, () => {
  // Pone al servidor a escuchar peticiones en el puerto indicado.
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use("/api/products", productRoutes); // Rutas

app.use("/products", viewRoutes);

app.use("/", authRoutes); // Autenticacion

//endpoint crear usuarios

app.post("/api/users", async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        message: "Datos invalidos, asegurate de enviar todos los campos",
      });
    }

    let sql = `
            INSERT INTO usuarios (correo, password)
            VALUES (?, ?)
        `;

    const [rows] = await connection.query(sql, [correo, password]);

    res.status(201).json({
      message: "Usuario creado con exito",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno en el servidor",
      error: error,
    });
  }
});


// Endpoint para cerrar sesion (destruir sesion y redireccionar)
app.post("/logout", (req, res) => {
  // Destruimos la sesion que habiamos creado
  req.session.destroy((error) => {
    if (error) {
      console.error("Error al destruir la sesion", error);
      return res.status(500).json({
        error: "Error al cerrar la sesion",
      });
    }

    res.redirect("/products/loggin"); // Redirigimos a login
  });
});

export default app;
