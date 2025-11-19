import { body, validationResult } from 'express-validator';

/**
 * Middleware que recopila errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: extractedErrors
    });
  }

  next();
};

/**
 * 🧾 Validaciones para el registro
 */
export const registerValidation = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('correo_usuario')
    .trim()
    .notEmpty()
    .withMessage('El correo es obligatorio')
    .isEmail()
    .withMessage('Debe proporcionar un correo válido')
    .normalizeEmail(),

  body('contrasena')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),

  handleValidationErrors
];

/**
 * 🔐 Validaciones para el login
 */
export const loginValidation = [
  body('correo_usuario')
    .trim()
    .notEmpty()
    .withMessage('El correo es obligatorio')
    .isEmail()
    .withMessage('Debe proporcionar un correo válido')
    .normalizeEmail(),

  body('contrasena')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),

  handleValidationErrors
];