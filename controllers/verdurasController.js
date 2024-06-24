import { autenticado } from "../config/funciones.js";
import { Producto } from "../models/Producto.js";


const dashboardVerduras = async (req, res) => {
  const usuario = autenticado(req,res);
  try {
    let verduras = await Producto.findAll({ where: { categoria: "Verdura" } });
    if (verduras.length == 0) {
      verduras = null;
    }

    //RENDER A LA VISTA
    res.render("admin/verduras", {
      pagina: "Verduras",
      usuario,
      verduras,
    });
  } catch (error) {
    console.log(error);
  }
};


export { dashboardVerduras };
