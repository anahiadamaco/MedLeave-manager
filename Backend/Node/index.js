require('dotenv').config();
const express = require('express');
const flaskRoutes = require('./Routes/flaskRoutes');
const errorHandler = require('./Middleware/errorHandler');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', flaskRoutes);

// Middleware de errores (AL FINAL, después de las rutas)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;

// ========================================
// Routes/flaskRoutes.js (EJEMPLO)
// ========================================

const express = require('express');
const router = express.Router();
const db = require('../Config/Database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../Middleware/auth');

// REGISTRO
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validación
    if (!name || !email || !password) {
      const error = new Error('Todos los campos son requeridos');
      error.statusCode = 400;
      throw error;
    }

    // Verificar si existe
    const [existe] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existe.length > 0) {
      const error = new Error('Email ya registrado');
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insertar
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );

    // Generar token
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: { id: result.insertId, name, email }
    });

  } catch (error) {
    next(error); // Pasar al middleware de errores
  }
});

// LOGIN
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Email y password requeridos');
      error.statusCode = 400;
      throw error;
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      const error = new Error('Credenciales incorrectas');
      error.statusCode = 401;
      throw error;
    }

    const user = users[0];
    const passwordValido = await bcrypt.compare(password, user.password);
    
    if (!passwordValido) {
      const error = new Error('Credenciales incorrectas');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    next(error);
  }
});

// PERFIL (protegida)
router.get('/perfil', authMiddleware, async (req, res, next) => {
  try {
    const [users] = await db.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [req.userId]
    );

    if (users.length === 0) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    res.json({ usuario: users[0] });

  } catch (error) {
    next(error);
  }
});

module.exports = router;