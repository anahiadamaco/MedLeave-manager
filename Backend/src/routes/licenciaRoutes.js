
import express from 'express';
import multer from 'multer';
import { uploadLicenciaPDF } from '../controllers/licenciaController.js';

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // carpeta donde se guardarán los PDFs
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // nombre único
  }
});

// Filtrado para aceptar solo PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Ruta para subir PDF
// El 'pdf' aquí debe coincidir con el nombre del campo en el frontend
router.post('/', upload.single('pdf'), uploadLicenciaPDF);


export default router;
