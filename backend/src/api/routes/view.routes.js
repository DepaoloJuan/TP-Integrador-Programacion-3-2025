import { Router } from "express"

const router = Router();

// rutas de las vistas

router.get("/index", (req, res) => {
    res.render("index");
})
router.get("/consultar", (req, res) => {
    res.render("get");
})
router.get("/crear", (req, res) => {
    res.render("create");
})

router.get("/modificar", (req, res) => {
    res.render("update");
})

router.get("/eliminar", (req, res) => {
    res.render("delete");
})

router.get("/productos", (req, res) => {
    res.render("products");
})


export default router;