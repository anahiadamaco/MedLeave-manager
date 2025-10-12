import express from "express";
import cors from "cors";
import pool from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API funcionando correctamente 🚀");
});

export default app;