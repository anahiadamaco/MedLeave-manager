import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js"; // tu conexión MySQL (default export)
import { registerValidation, loginValidation } from "../validators/authValidators.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import SibApiV3Sdk from "sib-api-v3-sdk";

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

    // Generar JWT token (válido 7 días)
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        correo_usuario: user.correo_usuario,
        id_rol: user.id_rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      token: token,
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

    console.log(`[FORGOT_PASSWORD] Solicitado para: ${correo_usuario}`);

    // Buscar usuario por correo
    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo_usuario = ?", [
      correo_usuario,
    ]);

    if (rows.length === 0) {
      console.log(`[FORGOT_PASSWORD] Correo no encontrado: ${correo_usuario}`);
      // No devolver error específico por seguridad
      return res.json({
        success: true,
        message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
      });
    }

    const user = rows[0];
    console.log(`[FORGOT_PASSWORD] Usuario encontrado: ${user.id_usuario}`);

    // Generar token único (válido 1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Guardar token en BD
    await pool.query(
      "UPDATE usuario SET reset_token = ?, reset_token_expiry = ? WHERE id_usuario = ?",
      [token, tokenExpiry, user.id_usuario]
    );

    console.log(`[FORGOT_PASSWORD] Token generado: ${token}`);

    // Enviar email con Brevo
    try {
      // Configurar cliente de Brevo
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

      const resetLink = `http://localhost:8082/reset-password?token=${token}`;

      const emailData = new SibApiV3Sdk.SendSmtpEmail();
      emailData.subject = "Recuperar tu contraseña - MedLeave Manager";
      emailData.htmlContent = `
        <h2>Hola ${user.nombre}</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="${resetLink}" style="background-color: #0089E0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Restablecer Contraseña
        </a>
        <p><strong>Este enlace es válido por 1 hora.</strong></p>
        <p>Si no solicitaste esto, ignora este correo.</p>
      `;
      emailData.sender = {
        name: "MedLeave Manager",
        email: process.env.BREVO_SENDER_EMAIL || "noreply.medleave@gmail.com"
      };
      emailData.to = [{
        email: correo_usuario,
        name: user.nombre
      }];

      await apiInstance.sendTransacEmail(emailData);
      console.log(`[FORGOT_PASSWORD] Email enviado a: ${correo_usuario}`);
    } catch (emailError) {
      console.error("[FORGOT_PASSWORD] Error enviando email:", emailError.message);
      // El token se generó pero el email falló - igual respondemos éxito
    }

    res.json({
      success: true,
      message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
      token: token, // Para desarrollo/testing
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