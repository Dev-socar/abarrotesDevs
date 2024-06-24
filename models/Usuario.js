import Sequelize from "sequelize";
import db from "../config/conexion.js";

export const Usuario = db.define("admins", {
  usuario: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
  },
});
