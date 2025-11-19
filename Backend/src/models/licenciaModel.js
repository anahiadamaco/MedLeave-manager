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
  const { folio, fecha_emision, fecha_inicio, fecha_fin, id_usuario, motivo_medico } = licencia;
  const [result] = await pool.query(
    `INSERT INTO licenciamedica (folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, fecha_creacion, id_usuario) 
     VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
    [folio, fecha_emision, fecha_inicio, fecha_fin, motivo_medico, id_usuario]
  );
  return result.insertId;
};


// NUEVA FUNCIÓN: Crear licencia con PDF
export const createLicenciaWithPDF = async (data) => {
  const query = `
    INSERT INTO licencias (
      userId, 
      fileName, 
      filePath, 
      originalName, 
      fileSize, 
      uploadDate, 
      status, 
      extractedInfo, 
      validationDetails
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    data.userId,
    data.fileName,
    data.filePath,
    data.originalName,
    data.fileSize,
    data.uploadDate,
    data.status,
    JSON.stringify(data.extractedInfo),
    JSON.stringify(data.validationDetails)
  ];
  
  const [result] = await pool.query(query, values);
  return result.insertId;
};

// NUEVA FUNCIÓN: Actualizar estado de licencia
export const updateLicenciaStatus = async (id, status, reviewNotes = null) => {
  const query = `
    UPDATE licencias 
    SET status = ?, reviewNotes = ?, reviewDate = NOW() 
    WHERE id = ?
  `;
  
  const [result] = await pool.query(query, [status, reviewNotes, id]);
  return result.affectedRows > 0;
};