import { autenticado } from "../config/funciones.js";
import { Producto } from "../models/Producto.js";

const dashboardFrutas = async (req, res) => {
  const usuario = autenticado(req, res);

  try {
    let frutas = await Producto.findAll({where:{categoria:"Fruta"}});
    if (frutas.length == 0) {
      frutas = null;
    }
    //RENDER A LA VISTA
    res.render("admin/frutas", {
      pagina: "Frutas",
      usuario,
      frutas,
    });
  } catch (error) {
    console.log(error);
  }
};





export { dashboardFrutas };
