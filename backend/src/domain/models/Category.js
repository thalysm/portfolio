const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    pt: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true }
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;