const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

// --- Rota Pública ---
router.post('/contact', messageController.create);

// --- Rotas Protegidas (Admin) ---
router.get('/messages', authMiddleware, messageController.getAll);
router.delete('/messages/:id', authMiddleware, messageController.remove);

module.exports = router;