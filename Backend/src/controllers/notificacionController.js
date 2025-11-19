import * as NotificacionModel from "../models/notificacionModel.js";

export const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await NotificacionModel.getAllNotificaciones();
    res.json({
      success: true,
      data: notificaciones,
      message: `${notificaciones.length} notificaciones encontradas`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNotificacionesUsuario = async (req, res) => {
  try {
    const notificaciones = await NotificacionModel.getNotificacionesByUsuario(req.params.id_usuario);
    res.json({
      success: true,
      data: notificaciones,
      message: `${notificaciones.length} notificaciones encontradas`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getNotificacionesNoLeidasUsuario = async (req, res) => {
  try {
    const notificaciones = await NotificacionModel.getNotificacionesNoLeidasByUsuario(req.params.id_usuario);
    res.json({
      success: true,
      data: notificaciones,
      message: `${notificaciones.length} notificaciones sin leer`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createNotificacion = async (req, res) => {
  try {
    const id = await NotificacionModel.createNotificacion(req.body);
    res.status(201).json({
      success: true,
      message: "Notificación creada",
      id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id_notificacion } = req.params;
    const affected = await NotificacionModel.markAsRead(id_notificacion);
    
    if (affected === 0) {
      return res.status(404).json({
        success: false,
        message: "Notificación no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Notificación marcada como leída",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const affected = await NotificacionModel.markAllAsReadByUsuario(id_usuario);

    res.json({
      success: true,
      message: `${affected} notificaciones marcadas como leídas`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};