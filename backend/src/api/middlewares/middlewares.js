// Middleware para loguear la URL y el método de cada petición
const loggerUrl = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
};

//middleware de ruta -> se aplica a rutas especificas

const validateId = (req, res, next) => {
  let { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "El ID del producto es inválido",
    });
  }
  //convertir el parametro id a numero
  req.params.id = Number(id, 10);
  console.log(`ID validado: ${req.params.id}`);
  next();
};

export { loggerUrl, validateId };
