const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/resume', resumeController.getAll);
router.get('/resume/:id', resumeController.getById);

router.post('/resume', authMiddleware, resumeController.create);
router.put('/resume/:id', authMiddleware, resumeController.update);
router.delete('/resume/:id', authMiddleware, resumeController.remove);

module.exports = router;