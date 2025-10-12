import pool from "../config/db.js";

export const getAllLicencias = async () => {
  const [rows] = await pool.query("SELECT * FROM licenciamedica");
  return rows;
};

export const getLicenciaById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM licenciamedica WHERE id_licencia = ?", [id]);
  return rows[0];
};

export const createLicencia = async (licencia) => {
  const { folio, fecha_emision, fecha_inicio, fecha_fin, id_usuario } = licencia;
  const [result] = await pool.query(
    `INSERT INTO licenciamedica (folio, fecha_emision, fecha_inicio, fecha_fin, fecha_creacion, id_usuario) 
     VALUES (?, ?, ?, ?, NOW(), ?)`,
    [folio, fecha_emision, fecha_inicio, fecha_fin, id_usuario]
  );
  return result.insertId;
};