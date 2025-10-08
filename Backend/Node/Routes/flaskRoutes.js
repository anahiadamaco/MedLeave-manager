const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');

// Rutas para usuarios
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Ruta de prueba
router.get('/test', (req, res) => {
  res.json({ 
    message: '✅ API funcionando correctamente',
    timestamp: new Date().toISOString(),
    status: 'Todas las rutas operativas'
  });
});

module.exports = router;