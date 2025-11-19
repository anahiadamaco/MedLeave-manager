import pool from "./config/db.js";

async function initDB() {
  try {
    // ------------------------------------------------
    // Crear tablas (en orden para respetar FK)
    // ------------------------------------------------

    // 1️⃣ rol
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rol (
        id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nombre_rol ENUM('funcionario','estudiante','profesor') NOT NULL,
        descripcion TEXT DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 2️⃣ usuario
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        correo_usuario VARCHAR(100) NOT NULL UNIQUE,
        nombre VARCHAR(50) NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        activo TINYINT(1) NOT NULL DEFAULT 1,
        id_rol INT NOT NULL,
        FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 3️⃣ licenciamedica
    await pool.query(`
      CREATE TABLE IF NOT EXISTS licenciamedica (
        id_licencia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        folio VARCHAR(45) NOT NULL,
        fecha_emision DATE NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        estado ENUM('pendiente','aceptado','rechazado') DEFAULT 'pendiente',
        motivo_rechazo MEDIUMTEXT DEFAULT NULL,
        fecha_creacion DATE NOT NULL,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 4️⃣ archivolicencia
    await pool.query(`
      CREATE TABLE IF NOT EXISTS archivolicencia (
        id_archivo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ruta_url VARCHAR(4096) NOT NULL,
        tipo_mime VARCHAR(100) NOT NULL,
        hash VARCHAR(128) NOT NULL,
        tamano INT NOT NULL,
        fecha_subida DATETIME NOT NULL,
        id_licencia INT NOT NULL,
        FOREIGN KEY (id_licencia) REFERENCES licenciamedica(id_licencia) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 5️⃣ curso
    await pool.query(`
      CREATE TABLE IF NOT EXISTS curso (
        id_curso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre_curso VARCHAR(100) NOT NULL,
        semestre ENUM('1','2') NOT NULL,
        seccion INT NOT NULL DEFAULT 1,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 5.5️⃣ licencia_curso (Junction table for multiple courses per license)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS licencia_curso (
        id_licencia_curso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_licencia INT NOT NULL,
        id_curso INT NOT NULL,
        UNIQUE KEY unique_licencia_curso (id_licencia, id_curso),
        FOREIGN KEY (id_licencia) REFERENCES licenciamedica(id_licencia) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 6️⃣ historiallicencias
    await pool.query(`
      CREATE TABLE IF NOT EXISTS historiallicencias (
        id_historial INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        estado_actual ENUM('pendiente','aceptado','rechazado') NOT NULL,
        observacion TEXT DEFAULT NULL,
        fecha_actualizacion DATETIME NOT NULL,
        id_licencia INT NOT NULL,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_licencia) REFERENCES licenciamedica(id_licencia) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 7️⃣ logauditoria
    await pool.query(`
      CREATE TABLE IF NOT EXISTS logauditoria (
        id_log INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        accion ENUM('crear cuenta','actualizar cuenta','iniciar sesion','recuperar contraseña','emitir licencia','aceptar licencia','rechazar licencia') NOT NULL,
        recurso VARCHAR(50) NOT NULL,
        payload TEXT DEFAULT NULL,
        ip VARCHAR(50) NOT NULL,
        fecha DATETIME NOT NULL,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 8️⃣ notificacion
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notificacion (
        id_notificacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        asunto TEXT NOT NULL,
        contenido TEXT NOT NULL,
        leido TINYINT(1) NOT NULL DEFAULT 0,
        fecha_envio DATETIME NOT NULL,
        id_usuario INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    // 9️⃣ perfil
    await pool.query(`
      CREATE TABLE IF NOT EXISTS perfil (
        id_perfil INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        direccion VARCHAR(120) DEFAULT NULL,
        numero_telef VARCHAR(20) DEFAULT NULL,
        email_alt VARCHAR(150) DEFAULT NULL,
        foto_url VARCHAR(255) DEFAULT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);

    console.log("✅ Todas las tablas fueron creadas correctamente");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
    process.exit(1);
  }
}

initDB();