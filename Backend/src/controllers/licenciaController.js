import * as LicenciaModel from "../models/licenciaModel.js";
import pool from "../config/db.js";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import pako from "pako";

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
    res.status(201).json({ success: true, message: "Licencia creada", id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Subir licencia con archivo (JSON + base64)
export const uploadLicencia = async (req, res) => {
  try {
    console.log("📝 [1] Iniciando uploadLicencia...");
    
    const { folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, cursos, id_usuario, file } = req.body;
    console.log("📦 [2] Datos recibidos:", { folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_usuario, file: file ? { name: file.name, type: file.type, base64Length: file.base64?.length } : null });

    // Validar campos
    if (!folio || !fecha_emision || !fecha_inicio || !fecha_fin || !id_usuario || !motivo_medico) {
      console.log("❌ [3] Campos incompletos");
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (!file || !file.base64 || !file.name) {
      console.log("❌ [3b] Archivo incompleto o no recibido");
      return res.status(400).json({ error: "No se recibió archivo válido" });
    }
    
    console.log("✅ [3] Validación de campos exitosa");

    // 1) Crear licencia
    console.log("📝 [4] Creando licencia en BD...");
    const licenciaId = await LicenciaModel.createLicencia({
      folio,
      fecha_emision,
      fecha_inicio,
      fecha_fin,
      id_usuario,
      motivo_medico,
    });
    console.log("✅ [4] Licencia creada con ID:", licenciaId);

    // 2) Decodificar base64 y guardar archivo
    console.log("📝 [5] Decodificando base64 y guardando archivo...");
    let buffer = Buffer.from(file.base64, "base64");
    
    // Descomprimir si está comprimido
    if (file.compressed) {
      console.log("📊 [5a] Descomprimiendo archivo...");
      try {
        const compressed = buffer;
        buffer = Buffer.from(pako.ungzip(compressed));
        console.log("✅ [5a] Archivo descomprimido. Tamaño original:", buffer.length);
      } catch (unzipError) {
        console.error("❌ [5a] Error descomprimiendo:", unzipError);
        return res.status(400).json({ error: "No se pudo descomprimir el archivo" });
      }
    }
    
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uploadsDir = path.resolve("uploads");
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log("📁 [5b] Directorio uploads creado");
    }
    
    const filePath = path.join(uploadsDir, uniqueSuffix + "-" + file.name);
    fs.writeFileSync(filePath, buffer);
    console.log("✅ [5c] Archivo guardado en:", filePath);

    // 3) Calcular hash SHA256
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    console.log("🔐 [6] Hash calculado:", hash);

    // 4) Insertar en tabla archivolicencia
    console.log("📝 [7] Insertando archivo en BD...");
    const query = `INSERT INTO archivolicencia (ruta_url, tipo_mime, hash, tamano, fecha_subida, id_licencia) VALUES (?, ?, ?, ?, NOW(), ?)`;
    const [result] = await pool.query(query, [filePath, file.type || "application/pdf", hash, buffer.length, licenciaId]);
    console.log("✅ [7] Archivo insertado con ID:", result.insertId);

    // 5) Respuesta exitosa
    console.log("✅ [8] Enviando respuesta exitosa");
    return res.status(201).json({
      success: true,
      message: "Licencia y archivo subidos correctamente",
      licenciaId,
      archivoId: result.insertId,
      motivo_medico,
      cursos,
      file: { path: filePath, type: file.type, size: buffer.length, hash },
    });
  } catch (error) {
    console.error("❌ [ERROR] Error uploadLicencia:", error);
    return res.status(500).json({ error: error.message });
  }
};