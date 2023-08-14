import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const STATUS_NOT_FOUND = 404;
const STATUS_UNAUTHORIZED = 401;
const STATUS_SERVER_ERROR = 500;

const MESSAGE_NOT_FOUND = "Usuário não encontrado.";
const MESSAGE_UNAUTHORIZED = "Credenciais inválidas.";
const MESSAGE_SERVER_ERROR = "Erro ao autenticar usuário.";

async function authenticateUser(req, res) {
  const { email, password } = req.body;
  try {
    console.log("Autenticando usuário...");

    const user = await User.findOne({ email });
    if (!user) {
      console.log(MESSAGE_NOT_FOUND);
      return res.status(STATUS_NOT_FOUND).json({ message: MESSAGE_NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(MESSAGE_UNAUTHORIZED);
      return res
        .status(STATUS_UNAUTHORIZED)
        .json({ message: MESSAGE_UNAUTHORIZED });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("Usuário autenticado com sucesso.");
    res.json({ token });
  } catch (err) {
    console.error("Erro ao autenticar usuário:", err);
    res.status(STATUS_SERVER_ERROR).json({ message: MESSAGE_SERVER_ERROR });
  }
}

export default {
  authenticateUser,
};
