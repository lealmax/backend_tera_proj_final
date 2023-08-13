import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Função para listar todos os usuários
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuários." });
  }
}

// Função para buscar um usuário por ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar o usuário." });
  }
}

// Função para criar um novo usuário
async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erro ao criar usuário.", error: err.message });
  }
}

// Função para atualizar um usuário existente
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    // Verifique se o campo de senha foi enviado no corpo da requisição
    if (password) {
      // Criptografe a senha atualizada antes de salvá-la no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);
      // Atualize o usuário com a senha criptografada
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password: hashedPassword },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      // Envie a resposta com o usuário atualizado (sem o token)
      res.json(updatedUser);
    } else {
      // Se a senha não foi enviada, atualize apenas nome e email
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      // Envie a resposta com o usuário atualizado (sem o token)
      res.json(updatedUser);
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar usuário.", error: err.message });
  }
}

// Função para excluir um usuário
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "Usuário excluído com sucesso." });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir usuário." });
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
