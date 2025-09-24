// Backend/Node/Routes/flaskRoutes.js

const express = require('express');
const { body } = require('express-validator');
const handleValidationErrors = require('../Middleware/validationMiddleware'); // Ajusta la ruta según tu estructura

const router = express.Router();

// Reglas de validación para el registro
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres')
];
router.post('/register', registerValidation, handleValidationErrors, register)

// Ejemplo de ruta con validación
router.post('/user', 
  [
    body('email').isEmail().withMessage('Email válido requerido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  handleValidationErrors,
  (req, res) => {
    // Si pasa la validación, manejar la solicitud
    res.json({ message: 'Usuario creado' });
  }
);

module.exports = router;