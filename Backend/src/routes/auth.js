import express from 'express';
import { registerValidation, loginValidation } from '../validators/authValidators.js';

const router = express.Router();

/**
 * Ruta de registro
 */
router.post('/register', async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      rut,
      correo,
      fecha_nacimiento,
      telefono,
      carrera,
      anio_ingreso,
    } = req.body;

    // Aquí iría la inserción en la base de datos:
    // await pool.query('INSERT INTO alumnos (...) VALUES (...)', [...]);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: { nombres, apellidos, correo },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar el usuario',
      error: error.message,
    });
  }
});

/**
 * Ruta de login
 */
router.post('/login', loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        email,
        token: 'tu-jwt-token-aqui',
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message,
    });
  }
});

export default router; // 👈 Importante
