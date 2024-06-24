import { Producto } from "../models/Producto.js";

const index = async (req, res) => {
  try {
    const articulos = await Producto.findAll({ where: { tag: "Si" } });
    res.render("index", {
      textoHeading: "Aqui encontraras lo mejor para tus alimentos",
      articulos,
    });
  } catch (error) {
    console.log(error);
  }
};

const verduras = async (req, res) => {
  try {
    const articulos = await Producto.findAll({
      where: { categoria: "Verdura" },
    });
    res.render("verduras", {
      pagina: "Verduras",
      articulos,
    });
  } catch (error) {
    console.log(error);
  }
};

const frutas = async (req, res) => {
  try {
    const articulos = await Producto.findAll({ where: { categoria: "Fruta" } });
    res.render("frutas", {
      pagina: "Frutas",
      articulos,
    });
  } catch (error) {
    console.log(error);
  }
};

const productos = async (req, res) => {
  try {
    const articulos = await Producto.findAll({
      where: { categoria: "Producto Comercial" },
    });
    res.render("productos", {
      pagina: "Productos",
      articulos,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = (req, res) => {
  res.render("login", {
    pagina: "Iniciar Sesion",
  });
};

export { login, index, verduras, frutas, productos };
