import multer from "multer";
import path from "path";
import fs from "fs";

const publicDirectory = "public";
const uploadDirectory = path.join(publicDirectory, "uploads");

// Función para asegurarse de que la carpeta exista
const createUploadsFolder = () => {
  const folderPath = path.resolve(uploadDirectory);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Llamar a la función para crear la carpeta uploads dentro de public si no existe
createUploadsFolder();

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory + "/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Configurar multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB para la imagen
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes (jpeg, jpg, png)"));
    }
  },
});

export { upload };
