const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// --- Rotas Públicas ---
router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getById);

// --- Rotas Protegidas (Admin) ---
router.post('/posts', authMiddleware, postController.create);
router.put('/posts/:id', authMiddleware, postController.update);
router.delete('/posts/:id', authMiddleware, postController.remove);

module.exports = router;