const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: [true, 'A mensagem é obrigatória'],
  },
  // Adicionamos um status 'read' para o admin
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true // Adiciona createdAt (útil para ordenar)
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;