import productModels from "../models/product.models.js";

export const vistaProductos = async (req, res) => {
  try {
    const [rows] = await productModels.selectAllProducts();
    res.render("index", {
      productos: rows,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
};
