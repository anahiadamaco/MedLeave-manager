import express from "express";
import cors from "cors";
import licenciaRoutes from "./routes/licenciaRoutes.js";
import notificacionRoutes from "./routes/notificacionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cursosRoutes from "./routes/cursosRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from './middlewares/logger.js';

const app = express();

// Configurar CORS más específicamente
app.use(cors({
  origin: ["http://localhost:8081", "http://localhost:8082", "http://192.168.100.231:8081", "http://192.168.100.231:8082"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(logger);

app.use("/api/licencias", licenciaRoutes);
app.use("/api/notificaciones", notificacionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cursos", cursosRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

app.get('/api/health', (req, res) => {
  res.json({ message: 'OK' });
});

// IMPORTANTE: Estos dos middlewares van AL FINAL, después de todas las rutas
app.use(notFound);        // Captura rutas no encontradas
app.use(errorHandler);    // Maneja todos los errores

export default app;



