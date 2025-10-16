import express from "express";
import cors from "cors";
import licenciaRoutes from "./routes/licenciaRoutes.js";
import notificacionRoutes from "./routes/notificacionRoutes.js";
import authRoutes from "./routes/auth.js"; 
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/licencias", licenciaRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});


// IMPORTANTE: Estos dos middlewares van AL FINAL, después de todas las rutas
app.use(notFound);        // Captura rutas no encontradas
app.use(errorHandler);    // Maneja todos los errores

export default app;



