import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Função para autenticar um usuário
async function authenticateUser(req, res) {
  const { email, password } = req.body;
  try {
    console.log("Autenticando usuário...");

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuário não encontrado.");
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Credenciais inválidas.");
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gere um novo token com a senha atualizada
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("Usuário autenticado com sucesso.");
    res.json({ token });
  } catch (err) {
    console.error("Erro ao autenticar usuário:", err);
    res.status(500).json({ message: "Erro ao autenticar usuário." });
  }
}

export default {
  authenticateUser,
};
