const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de MySQL
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
  acquireTimeout: 10000
};

// Remover opción inválida
delete dbConfig.timeout;

// Middleware
app.use(cors());
app.use(express.json());

let dbConnected = false;

// Probar conexión a MySQL
const testConnection = async () => {
  console.log('🔌 Conectando a MySQL...');
  console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('SELECT NOW() as server_time');
    console.log('✅ MySQL conectado');
    await connection.end();
    dbConnected = true;
    return true;
  } catch (error) {
    console.log('❌ MySQL no disponible:', error.message);
    console.log('⚠️  El servidor funcionará con datos de demostración');
    dbConnected = false;
    return false;
  }
};

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '✅ Backend funcionando',
    database: dbConnected ? 'Conectado' : 'Modo demo',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});



  

  

// Iniciar servidor
app.listen(PORT, async () => {
  console.log('='.repeat(50));
  console.log(`🚀 Servidor en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log('='.repeat(50));
  
  // Probar conexión (pero no bloquear el inicio)
  testConnection();
});