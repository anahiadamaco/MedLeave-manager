import pool from "../config/db.js";

export const getAllNotificaciones = async () => {
  const [rows] = await pool.query("SELECT * FROM notificacion");
  return rows;
};

export const getNotificacionesByUsuario = async (id_usuario) => {
  const [rows] = await pool.query("SELECT * FROM notificacion WHERE id_usuario = ?", [id_usuario]);
  return rows;
};

export const createNotificacion = async (notificacion) => {
  const { asunto, contenido, id_usuario } = notificacion;
  const [result] = await pool.query(
    "INSERT INTO notificacion (asunto, contenido, fecha_envio, id_usuario) VALUES (?, ?, NOW(), ?)",
    [asunto, contenido, id_usuario]
  );
  return result.insertId;
};