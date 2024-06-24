import Sequelize from "sequelize";
import db from "../config/conexion.js";

export const Producto = db.define("productos", {
  nombre: {
    type: Sequelize.STRING,
  },
  cantidad: {
    type: Sequelize.STRING,
  },
  precio: {
    type: Sequelize.STRING,
  },
  categoria: {
    type: Sequelize.STRING,
  },
  peso: {
    type: Sequelize.STRING,
  },
  tag: {
    type: Sequelize.STRING,
  },
  imagen: {
    type: Sequelize.STRING,
  },
  
});
