import bcryptjs from "bcryptjs";
import { Usuario } from "../models/Usuario.js";
import jwt from "jsonwebtoken";


export const iniciarSesion = async (req, res) => {
  const { usuario, password } = req.body;
  let errores = [];
  let token;

  if (usuario.trim() === "" || password.trim() === "") {
    errores.push({ mensaje: "Ambos Campos son Obligatorios" });
  }
  if (errores.length > 0) {
    res.render("login", {
      errores,
      usr: "",
      pagina: "Iniciar Sesion",
    });
  } else {
    try {
      const resultadoUsuario = await Usuario.findOne({ where: { usuario } });

      if (resultadoUsuario === null) {
        errores.push({ mensaje: "Usuario No Encontrado" });
      } else {
        const resultadoPassword = await bcryptjs.compare(
          password,
          resultadoUsuario.password
        );
        if (!resultadoPassword) {
          errores.push({
            mensaje: "Usuario encontrado pero contrasena incorrecta",
          });
        } else {
          token = jwt.sign({ resultadoUsuario }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
        }
      }
      if (errores.length > 0) {
        res.render("login", {
          errores,
          usr: resultadoUsuario ? resultadoUsuario.usuario : "",
          pagina: "Iniciar Sesion",
        });
      } else {
        res.cookie("access_token", token);
        res.redirect("dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const cerrarSesion = (req, res) => {
  res
    .clearCookie("access_token")
    .redirect("login");
};
