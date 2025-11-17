const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    pt: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true }
  },
  description: {
    pt: { type: String, required: true },
    en: { type: String, required: true }
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  projectLink: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;