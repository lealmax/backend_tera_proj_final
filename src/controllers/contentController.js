import Content from "../models/Content.js";

// Função para listar todos os conteúdos educacionais
async function getAllContents(req, res) {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar conteúdos educacionais." });
  }
}

// Função para buscar um conteúdo educacional por ID
async function getContentById(req, res) {
  const { id } = req.params;
  try {
    const content = await Content.findById(id);
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: "Conteúdo educacional não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar o conteúdo educacional." });
  }
}

// Função para criar um novo conteúdo educacional
async function createContent(req, res) {
  const { title, description } = req.body;
  try {
    const newContent = await Content.create({ title, description }); // Criação do conteúdo
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({
      message: "Erro ao criar conteúdo educacional.",
      error: err.message,
    });
  }
}

// async function createContent(req, res) {
//   const { title, description } = req.body;
//   try {
//     const newContent = await Content.create({ title, description });
//     res.status(201).json(newContent);
//   } catch (err) {
//     res.status(400).json({
//       message: "Erro ao criar conteúdo educacional.",
//       error: err.message,
//     });
//   }
// }

// Função para atualizar um conteúdo educacional existente
async function updateContent(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (updatedContent) {
      res.json(updatedContent);
    } else {
      res.status(404).json({ message: "Conteúdo educacional não encontrado." });
    }
  } catch (err) {
    res.status(400).json({
      message: "Erro ao atualizar conteúdo educacional.",
      error: err.message,
    });
  }
}

// Função para excluir um conteúdo educacional
async function deleteContent(req, res) {
  const { id } = req.params;
  try {
    const deletedContent = await Content.findByIdAndDelete(id);
    if (deletedContent) {
      res.json({ message: "Conteúdo educacional excluído com sucesso." });
    } else {
      res.status(404).json({ message: "Conteúdo educacional não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir conteúdo educacional." });
  }
}

export default {
  getAllContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
};
