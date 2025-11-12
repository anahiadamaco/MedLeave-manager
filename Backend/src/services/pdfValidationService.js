import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

class PdfValidationService {
  
  // Validar estructura básica del PDF
  async validatePdfStructure(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);
      
      return {
        isValid: true,
        pages: pdfData.numpages,
        text: pdfData.text,
        info: pdfData.info
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'PDF corrupto o no válido'
      };
    }
  }

  // Validar contenido del PDF
  async validateLicenciaContent(filePath) {
    const validation = await this.validatePdfStructure(filePath);
    
    if (!validation.isValid) {
      return validation;
    }

    const text = validation.text.toLowerCase();
    
    // Palabras clave que debe contener una licencia
    const requiredKeywords = ['licencia', 'conductor', 'vencimiento', 'clase'];
    const foundKeywords = requiredKeywords.filter(keyword => 
      text.includes(keyword)
    );

    // Validar que tenga al menos 2 palabras clave
    const isContentValid = foundKeywords.length >= 2;

    return {
      isValid: isContentValid,
      pages: validation.pages,
      foundKeywords: foundKeywords,
      message: isContentValid 
        ? 'El documento parece ser una licencia válida'
        : 'El documento no contiene información de licencia válida'
    };
  }

  // Extraer información específica (RUT, fechas, clase)
  async extractLicenciaInfo(filePath) {
    const validation = await this.validatePdfStructure(filePath);
    
    if (!validation.isValid) {
      return null;
    }

    const text = validation.text;
    
    // Expresiones regulares para datos chilenos
    const patterns = {
      rut: /\b\d{1,2}\.\d{3}\.\d{3}-[\dkK]\b/,
      fecha: /\d{2}[/-]\d{2}[/-]\d{4}/g,
      clase: /clase\s*[A-D]/i,
      nombre: /nombre[:\s]+([A-ZÁÉÍÓÚÑ\s]+)/i
    };

    const extracted = {};
    
    for (const [key, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        extracted[key] = Array.isArray(match) ? match : match[0];
      }
    }

    return extracted;
  }
}

export default new PdfValidationService();