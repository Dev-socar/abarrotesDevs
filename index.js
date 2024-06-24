import express from "express";
import router from "./router/index.js";
import db from "./config/conexion.js";
import cookieParser from "cookie-parser";
import path from "path";





const app = express();

//Conectar bd
db.authenticate()
  .then(() => {
    console.log('BD CONECTADA');
  })
  .catch(error => console.log(error))

const port = process.env.PORT || 3000;
//Habilitar pug
app.set("view engine", "pug");

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

//Definimos la carpeta publica
const publicPath = path.resolve("public");
app.use(express.static(publicPath));

app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Abarrotes Dev";
    next();
})

app.use("/", router);

app.listen(port, () => {
  console.log(`SERVIDOR CORRIENDO EN EL ${port}`);
});
