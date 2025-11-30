import {credencialesUsuario} from "../models/user.models.js";

const loggin = async (req, res) => {

  try {
    const { correo, password } = req.body;

    // Evitamos consulta innecesaria si falta un campo
    if (!correo || !password) {
      return res.render("loggin", {
        error: "Todos los campos son obligatorios!",
      });
    }

    // Ejecutamos la consulta en user.models
    const [rows] = await credencialesUsuario(correo, password);

    // Si no existen usuarios con ese correo o password
    if (rows.length === 0) {
      return res.render("loggin", {
        error: "Credenciales incorrectas!",
      });
    }

    const user = rows[0];

    // Guardamos la sesion
    req.session.user = {
      id: user.id,
      correo: user.correo,
    };


    // Redirigimos a la pagina principal
    return res.redirect("/products/index");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export { loggin };
