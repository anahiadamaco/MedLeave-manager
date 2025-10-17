import pool from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS fecha;");
    console.log("✅ Conexión exitosa a la base de datos RDS");
    console.log(rows);
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error.message);
  } finally {
    process.exit();
  }
})();