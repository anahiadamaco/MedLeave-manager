import express from "express";
import * as LicenciaController from "../controllers/licenciaController.js";

const router = express.Router();

router.get("/", LicenciaController.getLicencias);
router.get("/:id", LicenciaController.getLicencia);
router.post("/create", LicenciaController.createLicencia);

// Ruta para subir licencia con archivo: JSON + base64 (sin multer)
router.post("/upload", LicenciaController.uploadLicencia);

export default router;