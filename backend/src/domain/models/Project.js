const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Armazena a URL da imagem (ex: /uploads/nome-da-imagem.png)
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Adiciona createdAt e updatedAt
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;