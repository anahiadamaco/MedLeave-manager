import bcrypt from "bcrypt";
import { db } from "../config/db.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// 🧩 REGISTRO
export const registerUser = async (req, res) => {
  try {
    const { correo_usuario, nombre, contrasena, id_rol } = req.body;

    // Verificar si el correo ya existe
    const [existingUser] = await db.query(
      "SELECT * FROM usuario WHERE correo_usuario = ?",
      [correo_usuario]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, error: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insertar nuevo usuario
    await db.query(
      "INSERT INTO usuario (correo_usuario, nombre, contrasena, id_rol) VALUES (?, ?, ?, ?)",
      [correo_usuario, nombre, hashedPassword, id_rol || 2] // 2 = usuario normal
    );

    res.json({ success: true, message: "Usuario registrado correctamente ✅" });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ success: false, error: "Error al registrar usuario" });
  }
};

// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { correo_usuario, contrasena } = req.body;

    // Buscar usuario por correo
    const [rows] = await db.query("SELECT * FROM usuario WHERE correo_usuario = ?", [
      correo_usuario,
    ]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

    const user = rows[0];

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) return res.status(401).json({ success: false, error: "Contraseña incorrecta" });

    // Si todo ok, puedes devolver los datos o un token JWT más adelante
    res.json({
      success: true,
      message: "Inicio de sesión exitoso 🎉",
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo_usuario: user.correo_usuario,
        id_rol: user.id_rol,
      },
    });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ success: false, error: "Error en el inicio de sesión" });
  }
};

// 🔐 RECUPERAR CONTRASEÑA (Forgot Password)
export const forgotPassword = async (req, res) => {
  try {
    const { correo_usuario } = req.body;

    // Buscar usuario por correo
    const [rows] = await db.query("SELECT * FROM usuario WHERE correo_usuario = ?", [
      correo_usuario,
    ]);

    if (rows.length === 0) {
      // No devolver error específico por seguridad (evita enumeration attacks)
      return res.json({
        success: true,
        message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
      });
    }

    const user = rows[0];

    // Generar token único (válido 1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Guardar token en BD (crear tabla si no existe)
    await db.query(
      "UPDATE usuario SET reset_token = ?, reset_token_expiry = ? WHERE id_usuario = ?",
      [token, tokenExpiry, user.id_usuario]
    );

    // Configurar envío de email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Link de reseteo (adapta a tu frontend URL)
    const resetLink = `http://localhost:8082/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correo_usuario,
      subject: "Recuperar tu contraseña - MedLeave Manager",
      html: `
        <h2>Hola ${user.nombre}</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="${resetLink}" style="background-color: #0089E0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Restablecer Contraseña
        </a>
        <p>Este enlace es válido por 1 hora.</p>
        <p>Si no solicitaste esto, ignora este correo.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Si el correo existe en nuestro sistema, recibirás un enlace de recuperación.",
    });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    res.status(500).json({
      success: false,
      error: "Error al procesar la solicitud de recuperación",
    });
  }
};

// 🔐 RESTABLECER CONTRASEÑA (Reset Password)
export const resetPassword = async (req, res) => {
  try {
    const { token, contrasena } = req.body;

    if (!token || !contrasena) {
      return res.status(400).json({
        success: false,
        error: "Token y contraseña son requeridos",
      });
    }

    // Buscar usuario con ese token y verificar expiración
    const [rows] = await db.query(
      "SELECT * FROM usuario WHERE reset_token = ? AND reset_token_expiry > NOW()",
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: "El enlace de recuperación es inválido o ha expirado",
      });
    }

    const user = rows[0];

    // Hashear nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Actualizar contraseña y limpiar token
    await db.query(
      "UPDATE usuario SET contrasena = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id_usuario = ?",
      [hashedPassword, user.id_usuario]
    );

    res.json({
      success: true,
      message: "Tu contraseña ha sido restablecida correctamente ✅",
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({
      success: false,
      error: "Error al restablecer la contraseña",
    });
  }
};