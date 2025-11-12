import express from 'express';
import * as licenciaController from '../controllers/licenciaController.js';
import upload from '../config/multerConfig.js';
// import { authMiddleware } from '../middlewares/auth.js'; 

const router = express.Router();

// Rutas existentes
router.get('/', licenciaController.getLicencias);
router.get('/:id', licenciaController.getLicencia);
router.post('/', licenciaController.createLicencia);

// NUEVAS RUTAS para PDFs
router.post(
  '/upload-pdf',
 
  upload.single('licencia'), 
  licenciaController.uploadLicenciaPDF
);

router.get('/download-pdf/:id', licenciaController.downloadLicenciaPDF);

export default router;