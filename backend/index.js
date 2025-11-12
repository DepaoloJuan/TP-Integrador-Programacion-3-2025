import express from "express"; // Nos ayuda a crear servidores localmente
import environments from "./src/api/config/environments.js"; // Variables de entorno

import cors from "cors"; // Permite que el front haga peticiones al back
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

const app = express(); // Crea una instancia de Express.
const PORT = environments.PORT; // Guarda el puerto donde va a escuchar el servidor.

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json()); //trasnformar el json del post a objeto de js
app.use(loggerUrl);

// iniciamos el servidor
app.listen(PORT, () => {
  // Pone al servidor a escuchar peticiones en el puerto indicado.
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Rutas

app.use("/api/products", productRoutes);

//app.use("/api/users", rutasUsuario);

export default app;
