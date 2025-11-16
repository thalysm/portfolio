const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

// --- Rotas Públicas ---
router.get('/projects', projectController.getAll);
router.get('/projects/:id', projectController.getById);

// --- Rotas Protegidas (Admin) ---
router.post('/projects', authMiddleware, projectController.create);
router.put('/projects/:id', authMiddleware, projectController.update);
router.delete('/projects/:id', authMiddleware, projectController.remove);

module.exports = router;