import express from "express";
import { upload } from "../config/multer.js";
import {
  dashboard,
  dashboardCrear,
  dashboardCrearVista,
  dashboardEditarVista,
  dashboardEditar,
  dashboardEliminar,
} from "../controllers/dashboardController.js";
import { iniciarSesion, cerrarSesion } from "../controllers/LoginController.js";
import { dashboardProductos } from "../controllers/productosController.js";
import {
  index,
  login,
  verduras,
  productos,
  frutas,
} from "../controllers/paginasController.js";

import { dashboardFrutas } from "../controllers/frutasController.js";

import { dashboardVerduras } from "../controllers/verdurasController.js";

const router = express.Router();

//Sitio web
router.get("/", index);
router.get("/verduras", verduras);
router.get("/frutas", frutas);
router.get("/productos", productos);

//Login
router.get("/login", login);
router.post("/login", iniciarSesion);

//Dashboard
router.get("/dashboard", dashboard);
router.get("/dashboard/crear", dashboardCrearVista);
router.post("/dashboard/crear", upload.single("imagen"), dashboardCrear);
router.get("/dashboard/editar/:id", dashboardEditarVista);
router.post("/dashboard/editar/:id", dashboardEditar);
router.get("/dashboard/eliminar/:id", dashboardEliminar);
router.get("/dashboard/frutas", dashboardFrutas);
router.get("/dashboard/verduras", dashboardVerduras);
router.get("/dashboard/productos", dashboardProductos);

router.post("/logout", cerrarSesion);

export default router;
