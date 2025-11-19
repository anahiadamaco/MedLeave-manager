import * as NotificacionModel from "../models/notificacionModel.js";

export const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await NotificacionModel.getAllNotificaciones();
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotificacionesUsuario = async (req, res) => {
  try {
    console.log(`📬 [NOTIFICACIONES] Obteniendo notificaciones para usuario: ${req.params.id_usuario}`);
    
    const notificaciones = await NotificacionModel.getNotificacionesByUsuario(req.params.id_usuario);
    
    console.log(`✅ [NOTIFICACIONES] ${notificaciones.length} notificaciones encontradas`);
    
    res.json({ success: true, data: notificaciones });
  } catch (error) {
    console.error(`❌ [NOTIFICACIONES] Error:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createNotificacion = async (req, res) => {
  try {
    const id = await NotificacionModel.createNotificacion(req.body);
    res.status(201).json({ message: "Notificación creada", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
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