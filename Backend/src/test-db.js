import pool from "./config/db.js";

const testConnection = async () => {
  try {
    // Hacemos una consulta trivial, aunque las tablas estén vacías
    await pool.query("SELECT 1");
    console.log("✅ Conexión exitosa a la base de datos");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:");
    console.error(error.message);
    process.exit(1);
  }
};

testConnection();