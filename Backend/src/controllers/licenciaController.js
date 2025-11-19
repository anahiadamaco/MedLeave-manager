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

export const getLicenciasUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    console.log(`📍 [LICENCIAS] Buscando licencias para usuario: ${id_usuario}`);
    
    const licencias = await LicenciaModel.getLicenciasByUsuario(id_usuario);
    console.log(`✅ [LICENCIAS] ${licencias.length} licencias encontradas`);
    console.log(`📦 [LICENCIAS] Datos:`, JSON.stringify(licencias, null, 2));
    
    res.json({ success: true, data: licencias });
  } catch (error) {
    console.error(`❌ [LICENCIAS] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
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
    
    const { folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_cursos, id_usuario, file } = req.body;
    console.log("📦 [2] Datos recibidos:", { folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_usuario, id_cursos, file: file ? { name: file.name, type: file.type, base64Length: file.base64?.length } : null });

    // Validar campos
    if (!folio || !fecha_emision || !fecha_inicio || !fecha_fin || !id_usuario || !motivo_medico) {
      console.log("❌ [3] Campos incompletos");
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    if (!id_cursos || !Array.isArray(id_cursos) || id_cursos.length === 0) {
      console.log("❌ [3a] Cursos incompletos o no es un array");
      return res.status(400).json({ error: "Debe seleccionar al menos un curso" });
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

    // 2) Asociar cursos a la licencia
    console.log("📝 [4a] Asociando cursos a licencia...");
    for (const cursoId of id_cursos) {
      const queryLicenciaCurso = `INSERT INTO licencia_curso (id_licencia, id_curso) VALUES (?, ?)`;
      await pool.query(queryLicenciaCurso, [licenciaId, cursoId]);
      console.log(`✅ [4a] Curso ${cursoId} asociado a licencia ${licenciaId}`);
    }

    // 3) Decodificar base64 y guardar archivo
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

    // 4) Calcular hash SHA256
    const hash = crypto.createHash("sha256").update(buffer).digest("hex");
    console.log("🔐 [6] Hash calculado:", hash);

    // 5) Insertar en tabla archivolicencia
    console.log("📝 [7] Insertando archivo en BD...");
    const query = `INSERT INTO archivolicencia (ruta_url, tipo_mime, hash, tamano, fecha_subida, id_licencia) VALUES (?, ?, ?, ?, NOW(), ?)`;
    const [result] = await pool.query(query, [filePath, file.type || "application/pdf", hash, buffer.length, licenciaId]);
    console.log("✅ [7] Archivo insertado con ID:", result.insertId);

    // 6) Respuesta exitosa
    console.log("✅ [8] Enviando respuesta exitosa");
    return res.status(201).json({
      success: true,
      message: "Licencia y archivo subidos correctamente",
      licenciaId,
      archivoId: result.insertId,
      motivo_medico,
      id_cursos,
      file: { path: filePath, type: file.type, size: buffer.length, hash },
    });
  } catch (error) {
    console.error("❌ [ERROR] Error uploadLicencia:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todas las licencias pendientes de aprobación
export const getLicenciasPendientes = async (req, res) => {
  try {
    console.log("📍 [SOLICITUDES] GET /solicitudes/pendientes recibida");
    
    const solicitudes = await LicenciaModel.getLicenciasPendientes();
    console.log(`✅ [SOLICITUDES] ${solicitudes.length} solicitudes pendientes encontradas`);
    
    res.json({ success: true, data: solicitudes });
  } catch (error) {
    console.error("❌ [SOLICITUDES] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Aprobar una licencia
export const aprobarLicencia = async (req, res) => {
  try {
    const { id_licencia } = req.params;
    console.log(`📍 [APROBAR] Aprobando licencia: ${id_licencia}`);
    
    // Verificar que la licencia existe
    const licencia = await LicenciaModel.getLicenciaById(id_licencia);
    if (!licencia) {
      console.log(`❌ [APROBAR] Licencia no encontrada: ${id_licencia}`);
      return res.status(404).json({ success: false, error: "Licencia no encontrada" });
    }
    
    // Actualizar estado a 'aceptado'
    await LicenciaModel.updateLicenciaEstado(id_licencia, 'aceptado');
    console.log(`✅ [APROBAR] Licencia ${id_licencia} aprobada`);
    
    // Crear notificación para el estudiante
    const { id_usuario } = licencia;
    const asunto = "Licencia médica aprobada";
    const contenido = `Tu licencia médica con folio ${licencia.folio} ha sido aprobada.`;
    
    try {
      await pool.query(
        `INSERT INTO notificacion (asunto, contenido, fecha_envio, id_usuario) VALUES (?, ?, NOW(), ?)`,
        [asunto, contenido, id_usuario]
      );
      console.log(`✅ [APROBAR] Notificación enviada a usuario ${id_usuario}`);
    } catch (notifError) {
      console.error(`⚠️ [APROBAR] Error al enviar notificación:`, notifError);
    }
    
    res.json({ success: true, message: "Licencia aprobada correctamente" });
  } catch (error) {
    console.error("❌ [APROBAR] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Rechazar una licencia
export const rechazarLicencia = async (req, res) => {
  try {
    const { id_licencia } = req.params;
    const { motivo_rechazo } = req.body;
    
    if (!motivo_rechazo || motivo_rechazo.trim().length < 10) {
      console.log(`❌ [RECHAZAR] Motivo inválido`);
      return res.status(400).json({ 
        success: false, 
        error: "Debe proporcionar un motivo de rechazo válido (mínimo 10 caracteres)" 
      });
    }
    
    console.log(`📍 [RECHAZAR] Rechazando licencia: ${id_licencia}`);
    
    // Verificar que la licencia existe
    const licencia = await LicenciaModel.getLicenciaById(id_licencia);
    if (!licencia) {
      console.log(`❌ [RECHAZAR] Licencia no encontrada: ${id_licencia}`);
      return res.status(404).json({ success: false, error: "Licencia no encontrada" });
    }
    
    // Actualizar estado a 'rechazado' con motivo
    await LicenciaModel.updateLicenciaEstado(id_licencia, 'rechazado', motivo_rechazo.trim());
    console.log(`✅ [RECHAZAR] Licencia ${id_licencia} rechazada`);
    
    // Crear notificación para el estudiante
    const { id_usuario } = licencia;
    const asunto = "Licencia médica rechazada";
    const contenido = `Tu licencia médica con folio ${licencia.folio} ha sido rechazada.\n\nMotivo: ${motivo_rechazo.trim()}`;
    
    try {
      await pool.query(
        `INSERT INTO notificacion (asunto, contenido, fecha_envio, id_usuario) VALUES (?, ?, NOW(), ?)`,
        [asunto, contenido, id_usuario]
      );
      console.log(`✅ [RECHAZAR] Notificación enviada a usuario ${id_usuario}`);
    } catch (notifError) {
      console.error(`⚠️ [RECHAZAR] Error al enviar notificación:`, notifError);
    }
    
    res.json({ success: true, message: "Licencia rechazada correctamente" });
  } catch (error) {
    console.error("❌ [RECHAZAR] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};