import * as NotificacionModel from "../models/notificacionModel.js";

export const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await NotificacionModel.getAllNotificaciones();
    res.json({ success: true, data: notificaciones });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNotificacionesUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    console.log(`📬 [NOTIFICACIONES] Obteniendo notificaciones para usuario: ${id_usuario}`);
    
    const notificaciones = await NotificacionModel.getNotificacionesByUsuario(id_usuario);
    
    console.log(`✅ [NOTIFICACIONES] ${notificaciones.length} notificaciones encontradas`);
    
    res.json({ success: true, data: notificaciones });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNotificacionesNoLeidas = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    console.log(`📬 [NOTIFICACIONES] Obteniendo notificaciones NO LEÍDAS para usuario: ${id_usuario}`);
    
    const notificaciones = await NotificacionModel.getNotificacionesNoLeidas(id_usuario);
    
    console.log(`✅ [NOTIFICACIONES] ${notificaciones.length} notificaciones no leídas encontradas`);
    
    res.json({ success: true, data: notificaciones });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createNotificacion = async (req, res) => {
  try {
    const { asunto, contenido, id_usuario } = req.body;
    
    if (!asunto || !contenido || !id_usuario) {
      return res.status(400).json({ success: false, error: "Faltan campos requeridos" });
    }
    
    console.log(`📨 [NOTIFICACIONES] Creando notificación para usuario: ${id_usuario}`);
    
    const id = await NotificacionModel.createNotificacion({ asunto, contenido, id_usuario });
    
    console.log(`✅ [NOTIFICACIONES] Notificación ${id} creada exitosamente`);
    
    res.status(201).json({ success: true, message: "Notificación creada", id });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const markNotificacionLeida = async (req, res) => {
  try {
    const { id_notificacion } = req.params;
    console.log(`📌 [NOTIFICACIONES] Marcando notificación ${id_notificacion} como leída`);
    
    await NotificacionModel.updateNotificacionLeida(id_notificacion, true);
    
    console.log(`✅ [NOTIFICACIONES] Notificación ${id_notificacion} marcada como leída`);
    
    res.json({ success: true, message: "Notificación marcada como leída" });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const markAllNotificacionesLeidas = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    console.log(`📌 [NOTIFICACIONES] Marcando todas las notificaciones como leídas para usuario: ${id_usuario}`);
    
    const result = await NotificacionModel.markAllNotificacionesLeidas(id_usuario);
    
    console.log(`✅ [NOTIFICACIONES] ${result.affectedRows} notificaciones marcadas como leídas`);
    
    res.json({ success: true, message: "Notificaciones marcadas como leídas" });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteNotificacion = async (req, res) => {
  try {
    const { id_notificacion } = req.params;
    console.log(`🗑️ [NOTIFICACIONES] Eliminando notificación: ${id_notificacion}`);
    
    await NotificacionModel.deleteNotificacion(id_notificacion);
    
    console.log(`✅ [NOTIFICACIONES] Notificación ${id_notificacion} eliminada`);
    
    res.json({ success: true, message: "Notificación eliminada" });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};