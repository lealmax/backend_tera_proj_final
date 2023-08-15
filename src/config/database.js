import mongoose from "mongoose";
import dotenv from "dotenv"; // Importe o dotenv

dotenv.config(); // Configure o dotenv para carregar as variáveis de ambiente do arquivo .env

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexão com o MongoDB estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
  }
};

export default { connect };
