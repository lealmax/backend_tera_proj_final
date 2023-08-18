import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv"; // Importando dotenv

db.connect();

// Carregando as variáveis de ambiente com dotenv
dotenv.config(); // Carregando as variáveis de ambiente do arquivo .env

const app = express();

// Configuração de middlewares e parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Definição das rotas
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/auth", authRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.send("Bem-vindo ao Portal Educacional!");
});

// Tratamento de erro para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada." });
});

// Tratamento de erro global
app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
});

export default app;
