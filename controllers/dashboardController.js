import { autenticado, validarFormulario } from "../config/funciones.js";
import { Producto } from "../models/Producto.js";
import path from "path";
import fs from "fs";

const dashboard = async (req, res) => {
  const usuario = autenticado(req, res);
  try {
    const [
      frutas,
      temporadas,
      verduras,
      productos,
      
    ] = await Promise.all([
      Producto.findAll({
        order: [["id", "DESC"]],
        limit: 5,
        where: { categoria: "Fruta" },
      }),
      Producto.findAll({ where: { tag: "Si" }, order: [["id", "DESC"]] }),
      Producto.findAll({
        order: [["id", "DESC"]],
        limit: 5,
        where: { categoria: "Verdura" },
      }),
      Producto.findAll({
        order: [["id", "DESC"]],
        limit: 5,
        where: { categoria: "Producto Comercial" },
      })
      

    ]);
    
    res.render("admin/dashboard", {
      pagina: "Dashboard",
      usuario,
      frutas,
      verduras,
      temporadas,
      productos,
    });
  } catch (error) {
    console.log(error);
  }
};

const dashboardCrearVista = (req, res) => {
  const usuario = autenticado(req, res);

  res.render("admin/dashboard_crear", {
    pagina: "Dashboard",
    subpagina: "Crear",
    usuario,
  });
};

const dashboardCrear = async (req, res) => {
  const errores = validarFormulario(req);
  const erroresExisten = Object.values(errores).some((error) => error !== "");
  const { nombre, precio, tag, cantidad, peso, categoria } = req.body;
  const imagen = req.file ? req.file.filename : null;
  const usuario = autenticado(req, res);

  if (!erroresExisten) {
    try {
      await Producto.create({
        nombre,
        precio,
        categoria,
        tag: tag ? tag : "No",
        cantidad,
        peso,
        imagen,
      });
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      res.render("admin/dashboard_crear", {
        pagina: "Dashboard",
        subpagina: "Crear Articulo",
        usuario,
        nombre,
        precio,
        cantidad,
        categoria,
        errores,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const dashboardEditarVista = async (req, res) => {
  const usuario = autenticado(req, res);
  const { id } = req.params;

  try {
    const articulo = await Producto.findOne({ where: { id } });
    res.render("admin/dashboard_editar", {
      pagina: "Dashboard",
      subpagina: "Editando Articulo",
      usuario,
      articulo,
    });
  } catch (error) {
    console.log(error);
  }
};

const dashboardEditar = async (req, res) => {
  const usuario = autenticado(req, res);
  const { id } = req.params;
  const { nombre, cantidad, precio, categoria, peso, tag } = req.body;

  try {
    await Producto.update(
      {
        nombre,
        precio,
        categoria,
        tag: tag ? tag : "No",
        cantidad,
        peso,
      },
      { where: { id } }
    );

    const articulo = await Producto.findOne({ where: { id } });

    res.render("admin/dashboard_editar", {
      pagina: "Dashboard",
      subpagina: "Editando Articulo",
      actualizado: true,
      articulo,
      usuario,
    });
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error al actualizar el articulo" });
    }
  }
};

const dashboardEliminar = async (req, res) => {
  const usuario = autenticado(req, res);
  const { id } = req.params;
  try {
    const producto = await Producto.findOne({ where: { id } });
    const imagePath = path.join("/uploads/", producto.imagen);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Producto.destroy({ where: { id } });
    // Eliminar el archivo de imagen del sistema de archivos
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log(`Error al eliminar la imagen: ${err}`);
      } else {
        console.log(`Imagen eliminada: ${imagePath}`);
      }
    });
    let frutas = await Producto.findAll({ where: { categoria: "Fruta" } });
    if (frutas.length == 0) {
      frutas = null;
    }

    res.render("admin/frutas", {
      pagina: "Frutas",
      eliminado: true,
      usuario,
      frutas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

export {
  dashboard,
  dashboardCrear,
  dashboardCrearVista,
  dashboardEditarVista,
  dashboardEditar,
  dashboardEliminar,
};
