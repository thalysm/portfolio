const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // 'content' será o HTML/JSON do editor de rich text (Tiptap)
  content: {
    type: String,
    required: true,
  },
  // 'snippet' é um resumo curto para os cards do blog
  snippet: {
    type: String,
    required: true,
    trim: true,
  },
  // URL da imagem de destaque
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
}, {
  timestamps: true // Adiciona createdAt e updatedAt
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;