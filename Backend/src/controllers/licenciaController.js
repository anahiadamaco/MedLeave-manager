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
    
    console.log(`📊 [APROBAR] Licencia encontrada - Folio: ${licencia.folio}, Usuario: ${licencia.id_usuario}`);
    
    // Actualizar estado a 'aceptado'
    await LicenciaModel.updateLicenciaEstado(id_licencia, 'aceptado');
    console.log(`✅ [APROBAR] Licencia ${id_licencia} actualizada a estado 'aceptado'`);
    
    // Crear notificación para el estudiante
    const { id_usuario } = licencia;
    const asunto = "Licencia médica aprobada";
    const contenido = `Tu licencia médica con folio ${licencia.folio} ha sido aprobada.`;
    
    try {
      console.log(`📬 [APROBAR] Insertando notificación para usuario ${id_usuario}`);
      const [result] = await pool.query(
        `INSERT INTO notificacion (asunto, contenido, fecha_envio, id_usuario, leido) VALUES (?, ?, NOW(), ?, 0)`,
        [asunto, contenido, id_usuario]
      );
      console.log(`✅ [APROBAR] Notificación creada con ID: ${result.insertId} para usuario ${id_usuario}`);
    } catch (notifError) {
      console.error(`⚠️ [APROBAR] Error al crear notificación:`, notifError.message);
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
    
    console.log(`📊 [RECHAZAR] Licencia encontrada - Folio: ${licencia.folio}, Usuario: ${licencia.id_usuario}`);
    
    // Actualizar estado a 'rechazado' con motivo
    await LicenciaModel.updateLicenciaEstado(id_licencia, 'rechazado', motivo_rechazo.trim());
    console.log(`✅ [RECHAZAR] Licencia ${id_licencia} actualizada a estado 'rechazado'`);
    
    // Crear notificación para el estudiante
    const { id_usuario } = licencia;
    const asunto = "Licencia médica rechazada";
    const contenido = `Tu licencia médica con folio ${licencia.folio} ha sido rechazada.\n\nMotivo: ${motivo_rechazo.trim()}`;
    
    try {
      console.log(`📬 [RECHAZAR] Insertando notificación para usuario ${id_usuario}`);
      const [result] = await pool.query(
        `INSERT INTO notificacion (asunto, contenido, fecha_envio, id_usuario, leido) VALUES (?, ?, NOW(), ?, 0)`,
        [asunto, contenido, id_usuario]
      );
      console.log(`✅ [RECHAZAR] Notificación creada con ID: ${result.insertId} para usuario ${id_usuario}`);
    } catch (notifError) {
      console.error(`⚠️ [RECHAZAR] Error al crear notificación:`, notifError.message);
    }
    
    res.json({ success: true, message: "Licencia rechazada correctamente" });
  } catch (error) {
    console.error("❌ [RECHAZAR] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Editar una licencia pendiente
export const editarLicencia = async (req, res) => {
  try {
    const { id_licencia } = req.params;
    const { folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_cursos } = req.body;
    const userId = req.user.id_usuario;

    console.log(`📍 [EDITAR] Editando licencia: ${id_licencia}`);

    // Verificar que la licencia existe y pertenece al usuario
    const licencia = await LicenciaModel.getLicenciaById(id_licencia);
    if (!licencia) {
      console.log(`❌ [EDITAR] Licencia no encontrada: ${id_licencia}`);
      return res.status(404).json({ success: false, error: "Licencia no encontrada" });
    }

    // Verificar que pertenece al usuario autenticado
    if (licencia.id_usuario !== userId) {
      console.log(`❌ [EDITAR] El usuario ${userId} no es propietario de la licencia ${id_licencia}`);
      return res.status(403).json({ success: false, error: "No tienes permiso para editar esta licencia" });
    }

    // Verificar que la licencia está en estado pendiente
    if (licencia.estado.toLowerCase() !== "pendiente") {
      console.log(`❌ [EDITAR] Licencia ${id_licencia} no está en estado pendiente (estado: ${licencia.estado})`);
      return res.status(400).json({ success: false, error: "Solo puedes editar licencias en estado pendiente" });
    }

    console.log(`📊 [EDITAR] Licencia encontrada - Folio: ${licencia.folio}, Usuario: ${licencia.id_usuario}`);

    // Actualizar los datos de la licencia
    const query = `
      UPDATE licenciamedica 
      SET folio = ?, fecha_emision = ?, fecha_inicio = ?, fecha_fin = ?, motivo_medico = ?
      WHERE id_licencia = ?
    `;

    await pool.query(query, [folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_licencia]);
    console.log(`✅ [EDITAR] Licencia ${id_licencia} actualizada correctamente`);

    // Actualizar cursos si se proporcionan
    if (Array.isArray(id_cursos) && id_cursos.length > 0) {
      // Eliminar cursos anteriores
      await pool.query(`DELETE FROM licencia_curso WHERE id_licencia = ?`, [id_licencia]);
      console.log(`📝 [EDITAR] Cursos anteriores eliminados`);

      // Agregar nuevos cursos
      for (const cursoId of id_cursos) {
        const queryLicenciaCurso = `INSERT INTO licencia_curso (id_licencia, id_curso) VALUES (?, ?)`;
        await pool.query(queryLicenciaCurso, [id_licencia, cursoId]);
        console.log(`✅ [EDITAR] Curso ${cursoId} asociado a licencia ${id_licencia}`);
      }
    }

    res.json({ success: true, message: "Licencia editada correctamente" });
  } catch (error) {
    console.error("❌ [EDITAR] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deletarLicencia = async (req, res) => {
  try {
    const { id_licencia } = req.params;
    const userId = req.user.id_usuario;

    console.log(`🗑️ [ELIMINAR] Eliminando licencia: ${id_licencia}`);

    // Verificar que la licencia existe y pertenece al usuario
    const licencia = await LicenciaModel.getLicenciaById(id_licencia);
    if (!licencia) {
      console.log(`❌ [ELIMINAR] Licencia no encontrada: ${id_licencia}`);
      return res.status(404).json({ success: false, error: "Licencia no encontrada" });
    }

    // Verificar que pertenece al usuario autenticado
    if (licencia.id_usuario !== userId) {
      console.log(`❌ [ELIMINAR] El usuario ${userId} no es propietario de la licencia ${id_licencia}`);
      return res.status(403).json({ success: false, error: "No tienes permiso para eliminar esta licencia" });
    }

    // Verificar que la licencia está en estado pendiente
    if (licencia.estado.toLowerCase() !== "pendiente") {
      console.log(`❌ [ELIMINAR] Licencia ${id_licencia} no está en estado pendiente (estado: ${licencia.estado})`);
      return res.status(400).json({ success: false, error: "Solo puedes eliminar licencias en estado pendiente" });
    }

    console.log(`📊 [ELIMINAR] Licencia encontrada - Folio: ${licencia.folio}, Usuario: ${licencia.id_usuario}`);

    // Eliminar cursos asociados primero (por foreign key)
    await pool.query(`DELETE FROM licencia_curso WHERE id_licencia = ?`, [id_licencia]);
    console.log(`✅ [ELIMINAR] Cursos asociados eliminados`);

    // Eliminar archivos asociados
    await pool.query(`DELETE FROM archivolicencia WHERE id_licencia = ?`, [id_licencia]);
    console.log(`✅ [ELIMINAR] Archivos asociados eliminados`);

    // Eliminar la licencia
    await pool.query(`DELETE FROM licenciamedica WHERE id_licencia = ?`, [id_licencia]);
    console.log(`✅ [ELIMINAR] Licencia ${id_licencia} eliminada correctamente`);

    res.json({ success: true, message: "Licencia eliminada correctamente" });
  } catch (error) {
    console.error("❌ [ELIMINAR] Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener licencias de estudiantes en los cursos del profesor
export const getLicenciasProfesor = async (req, res) => {
  try {
    const id_profesor = req.user.id_usuario; // Obtener ID del profesor desde el token JWT
    
    console.log(`📍 [PROFESOR LICENCIAS] Buscando licencias para profesor: ${id_profesor}`);
    
    const licencias = await LicenciaModel.getLicenciasByProfesor(id_profesor);
    console.log(`✅ [PROFESOR LICENCIAS] ${licencias.length} licencias encontradas`);
    
    res.json({ success: true, data: licencias });
  } catch (error) {
    console.error(`❌ [PROFESOR LICENCIAS] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener licencias de un curso específico del profesor
export const getLicenciasProfesorCurso = async (req, res) => {
  try {
    const id_profesor = req.user.id_usuario;
    const { id_curso } = req.params;
    
    console.log(`📍 [PROFESOR CURSO] Buscando licencias para profesor: ${id_profesor}, curso: ${id_curso}`);
    
    // Verificar que el curso pertenece al profesor
    const [cursoVerify] = await pool.query(
      `SELECT id_curso FROM curso WHERE id_curso = ? AND id_usuario = ?`,
      [id_curso, id_profesor]
    );
    
    if (cursoVerify.length === 0) {
      console.log(`❌ [PROFESOR CURSO] El curso ${id_curso} no pertenece al profesor ${id_profesor}`);
      return res.status(403).json({ success: false, error: "No tienes acceso a este curso" });
    }
    
    const licencias = await LicenciaModel.getLicenciasByProfesorYCurso(id_profesor, id_curso);
    console.log(`✅ [PROFESOR CURSO] ${licencias.length} licencias encontradas para el curso`);
    
    res.json({ success: true, data: licencias });
  } catch (error) {
    console.error(`❌ [PROFESOR CURSO] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};