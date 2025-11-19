import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js"; // tu conexión MySQL (default export)
import { registerValidation, loginValidation } from "../validators/authValidators.js";
import crypto from "crypto";

const router = express.Router();

/**
 * REGISTRO
 */
router.post("/register", registerValidation, async (req, res) => {
  try {
    const { correo_usuario, nombre, contrasena, id_rol } = req.body;

    //Verificar si ya existe el correo
    const [userExists] = await pool.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo_usuario]
    );
    if (userExists.length > 0) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insertar usuario
    await pool.query(
      `INSERT INTO usuario (correo_usuario, nombre, contrasena, id_rol) VALUES (?, ?, ?, ?)`,
      [correo_usuario, nombre, hashedPassword, id_rol || 2] // por ejemplo: 2 = estudiante
    );

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: { correo_usuario, nombre },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
});

/**
 * 🔐 LOGIN
 */
router.post("/login", loginValidation, async (req, res) => {
  try {
    const { correo_usuario, contrasena } = req.body;

    // Buscar usuario
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo_usuario]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // generar JWT aquí más adelante
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo_usuario: user.correo_usuario,
        id_rol: user.id_rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
});

/**
 * 🔐 RECUPERAR CONTRASEÑA
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { correo_usuario } = req.body;

    // Buscar usuario por correo
    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo_usuario = ?", [
      correo_usuario,
    ]);

    if (rows.length === 0) {
      // No devolver error específico por seguridad
      return res.json({
        success: true,
        message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
      });
    }

    const user = rows[0];

    // Generar token único (válido 1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Guardar token en BD
    await pool.query(
      "UPDATE usuario SET reset_token = ?, reset_token_expiry = ? WHERE id_usuario = ?",
      [token, tokenExpiry, user.id_usuario]
    );

    console.log(`[FORGOT_PASSWORD] Token generado para ${correo_usuario}: ${token}`);
    console.log(`[FORGOT_PASSWORD] Link de reset: http://localhost:8082/reset-password?token=${token}`);

    // TODO: Aquí iría el envío de email con nodemailer
    // Por ahora, solo registramos en logs

    res.json({
      success: true,
      message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
    });
  } catch (error) {
    console.error("Error en forgot-password:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar la solicitud de recuperación",
    });
  }
});

/**
 * 🔐 RESTABLECER CONTRASEÑA
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { token, contrasena } = req.body;

    if (!token || !contrasena) {
      return res.status(400).json({
        success: false,
        message: "Token y contraseña son requeridos",
      });
    }

    // Buscar usuario con ese token y verificar expiración
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "El enlace de recuperación es inválido o ha expirado",
      });
    }

    const user = rows[0];

    // Hashear nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Actualizar contraseña y limpiar token
    await pool.query(
      "UPDATE usuario SET contrasena = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id_usuario = ?",
      [hashedPassword, user.id_usuario]
    );

    console.log(`[RESET_PASSWORD] Contraseña restablecida para usuario ${user.id_usuario}`);

    res.json({
      success: true,
      message: "Tu contraseña ha sido restablecida correctamente ✅",
    });
  } catch (error) {
    console.error("Error en reset-password:", error);
    res.status(500).json({
      success: false,
      message: "Error al restablecer la contraseña",
    });
  }
});

export default router;