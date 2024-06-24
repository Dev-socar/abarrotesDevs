import jwt from "jsonwebtoken";

const autenticado = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/login");
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const {
      resultadoUsuario: { usuario },
    } = data;

    return usuario;
  } catch (error) {
    return res.redirect("/login");
  }
};

const validarFormulario = (req) => {
  let errores = {
    errorNombre : '',
    errorPrecio : '',
    errorCantidad : '',
    errorPeso : '',
    errorCategoria : '',
    errorImagen : '',
  };
  const { nombre, precio, cantidad, peso, categoria } = req.body;
  const imagen = req.file ? req.file.filename : null;

  if (nombre.trim() === "") {
    errores.errorNombre = "El nombre esta vacio";
  }
  if (precio.trim() === '' || precio === '0') {
    errores.errorPrecio = "Minimo debe valer mas de 0 pesos";
  }
  if (cantidad.trim() === '' || cantidad === '0') {
    errores.errorCantidad = "Minimo debe haber 1 elemento en existencia";
  }
  if (peso === "") {
    errores.errorPeso = "Seleccione una opcion valida";
  }
  if (categoria === "") {
    errores.errorCategoria = "Seleccione una categoria";
  }
  if (imagen === null) {
    errores.errorImagen = "Debe subir una imagen del producto";
  }

  return errores;
};

export { autenticado, validarFormulario };
