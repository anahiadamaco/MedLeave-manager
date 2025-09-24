const express = require('express');
const axios = require('axios');
const userRoutes = require('./Routes/flaskRoutes');

const app = express();
app.use(express.json());

// Importar rutas
const flaskRoutes = require('./Routes/flaskRoutes'); // Ajusta la ruta y nombre
// Usar las rutas de usuarios
app.use('/api/users', userRoutes);
// Usar rutas
app.use('/api', flaskRoutes); 
// Datos en memoria
const usuarios = [
    { id: 1, nombre: 'Ana', email: 'ana@test.com' },
    { id: 2, nombre: 'Luis', email: 'luis@test.com' }
];

// Rutas principales
app.get('/', (req, res) => {
    res.json({ mensaje: 'Express funcionando' });
});

app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

// SOLUCIÓN: Usar app.use() en lugar de app.all()
app.use('/flask', (req, res) => {
    res.json({ 
        mensaje: 'Ruta de Flask manejada por Express',
        metodo: req.method,
        rutaOriginal: req.originalUrl,
        path: req.path
    });
});

app.listen(3000, () => console.log('Express corriendo en puerto 3000'));