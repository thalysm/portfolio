const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    pt: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true }
  },
  content: {
    pt: { type: String, required: true },
    en: { type: String, required: true }
  },
  snippet: {
    pt: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true }
  },
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
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;