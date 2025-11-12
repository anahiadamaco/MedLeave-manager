import * as LicenciaModel from "../models/licenciaModel.js";
import pdfValidationService from '../services/pdfValidationService.js';
import fs from 'fs/promises';

// Tus funciones existentes
export const getLicencias = async (req, res) => {
  try {
    const licencias = await LicenciaModel.getAllLicencias();
    res.json(licencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLicencia = async (req, res) => {
  try {
    const licencia = await LicenciaModel.getLicenciaById(req.params.id);
    if (!licencia) return res.status(404).json({ error: "Licencia no encontrada" });
    res.json(licencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLicencia = async (req, res) => {
  try {
    const id = await LicenciaModel.createLicencia(req.body);
    res.status(201).json({ message: "Licencia creada", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// NUEVA FUNCIÓN: Subir y validar licencia PDF
export const uploadLicenciaPDF = async (req, res) => {
  try {
    // Verificar que se subió un archivo
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se ha proporcionado ningún archivo PDF'
      });
    }

    const filePath = req.file.path;

    // Validar el PDF
    const validation = await pdfValidationService.validateLicenciaContent(filePath);

    if (!validation.isValid) {
      // Eliminar archivo si no es válido
      await fs.unlink(filePath);
      
      return res.status(400).json({
        success: false,
        message: validation.message || 'El PDF no es válido',
        details: validation
      });
    }

    // Extraer información del PDF
    const extractedInfo = await pdfValidationService.extractLicenciaInfo(filePath);

    // Preparar datos para guardar
    const licenciaData = {
      userId: req.user?.id || req.body.userId, // Ajusta según tu autenticación
      fileName: req.file.filename,
      filePath: filePath,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      uploadDate: new Date(),
      status: 'pendiente',
      extractedInfo: extractedInfo,
      validationDetails: {
        pages: validation.pages,
        foundKeywords: validation.foundKeywords
      }
    };

    // Guardar en base de datos
    const licenciaId = await LicenciaModel.createLicenciaWithPDF(licenciaData);

    // Respuesta de éxito
    return res.status(201).json({
      success: true,
      message: '✅ Licencia PDF cargada y validada exitosamente',
      data: {
        licenciaId: licenciaId,
        fileName: req.file.originalname,
        status: 'pendiente',
        uploadDate: licenciaData.uploadDate,
        validation: {
          isValid: true,
          pages: validation.pages,
          message: validation.message
        },
        extractedInfo: extractedInfo,
        nextSteps: 'Tu licencia será revisada por un administrador en las próximas 24 horas'
      }
    });

  } catch (error) {
    console.error('Error al cargar licencia PDF:', error);
    
    // Eliminar archivo si hubo error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error al eliminar archivo:', unlinkError);
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Error al procesar la licencia PDF',
      error: error.message
    });
  }
};

// NUEVA FUNCIÓN: Descargar licencia PDF
export const downloadLicenciaPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const licencia = await LicenciaModel.getLicenciaById(id);

    if (!licencia) {
      return res.status(404).json({
        success: false,
        message: 'Licencia no encontrada'
      });
    }

    // Verificar que tenga archivo PDF
    if (!licencia.filePath) {
      return res.status(404).json({
        success: false,
        message: 'Esta licencia no tiene archivo PDF asociado'
      });
    }

    // Descargar archivo
    res.download(licencia.filePath, licencia.originalName);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al descargar licencia',
      error: error.message
    });
  }
};
