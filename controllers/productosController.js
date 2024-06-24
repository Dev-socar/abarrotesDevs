import { autenticado } from "../config/funciones.js";
import { Producto } from "../models/Producto.js";

const dashboardProductos = async (req, res) => {
  const usuario = autenticado(req, res);

  let productos = await Producto.findAll({
    where: { categoria: "Producto Comercial" },
  });
    if (productos.length == 0) {
      productos = null;
    }

  res.render("admin/productos", {
    pagina: "Productos",
    usuario,
    productos,
  });
};

const dashboardProductosCrearVista = (req, res) => {
  const usuario = autenticado(req, res);

  res.render("admin/productos_crear", {
    pagina: "Productos",
    subpagina: "Crear",
    usuario,
  });
};

export { dashboardProductos, dashboardProductosCrearVista };
