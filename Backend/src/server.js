import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
  // console.log(`Accesible desde: http://192.168.100.223:${PORT}`); esta es la original
  console.log(`Accesible desde: http://172.20.10.11:${PORT}`); // esta la de mi PC
});