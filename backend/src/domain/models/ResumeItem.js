const mongoose = require('mongoose');

const resumeItemSchema = new mongoose.Schema({
  title: {
    pt: { type: String, required: true },
    en: { type: String, required: true }
  },
  institution: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String
  },
  isPresent: {
    type: Boolean,
    default: false
  },
  description: {
    pt: { type: String },
    en: { type: String }
  },
  type: {
    type: String,
    enum: ['Education', 'Experience'],
    required: true
  }
}, {
  timestamps: true
});

const ResumeItem = mongoose.model('ResumeItem', resumeItemSchema);

module.exports = ResumeItem;