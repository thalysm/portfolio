const express = require('express');
const router = express.Router();
const upload = require('../../config/multerConfig');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  
  res.status(201).json({
    message: 'Upload bem-sucedido!',
    url: fileUrl
  });
});

module.exports = router;