import pool from "../config/db.js";

export const getAllNotificaciones = async () => {
  const [rows] = await pool.query("SELECT * FROM notificacion");
  return rows;
};

export const getNotificacionesByUsuario = async (id_usuario) => {
  const [rows] = await pool.query(
    `SELECT * FROM notificacion 
     WHERE id_usuario = ? 
     ORDER BY fecha_envio DESC`,
    [id_usuario]
  );
  return rows;
};

export const getNotificacionesNoLeidas = async (id_usuario) => {
  const [rows] = await pool.query(
    `SELECT * FROM notificacion 
     WHERE id_usuario = ? AND leido = 0 
     ORDER BY fecha_envio DESC`,
    [id_usuario]
  );
  return rows;
};

export const createNotificacion = async (notificacion) => {
  const { asunto, contenido, id_usuario } = notificacion;
  const [result] = await pool.query(
    "INSERT INTO notificacion (asunto, contenido, fecha_envio, id_usuario, leido) VALUES (?, ?, NOW(), ?, 0)",
    [asunto, contenido, id_usuario]
  );
  return result.insertId;
};

export const updateNotificacionLeida = async (id_notificacion, leido = true) => {
  const [result] = await pool.query(
    "UPDATE notificacion SET leido = ? WHERE id_notificacion = ?",
    [leido ? 1 : 0, id_notificacion]
  );
  return result;
};

export const markAllNotificacionesLeidas = async (id_usuario) => {
  const [result] = await pool.query(
    "UPDATE notificacion SET leido = 1 WHERE id_usuario = ? AND leido = 0",
    [id_usuario]
  );
  return result;
};

export const deleteNotificacion = async (id_notificacion) => {
  const [result] = await pool.query(
    "DELETE FROM notificacion WHERE id_notificacion = ?",
    [id_notificacion]
  );
  return result;
};