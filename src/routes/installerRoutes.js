const express = require('express');
const router = express.Router();
const installerController = require('../controllers/installerController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Public route
router.post('/register', installerController.registerInstaller);

// Protected routes (Admin only)
router.get('/', authMiddleware, adminMiddleware, installerController.getAllInstallers);
router.patch('/:id/status', authMiddleware, adminMiddleware, installerController.updateStatus);
router.delete('/:id', authMiddleware, adminMiddleware, installerController.deleteInstaller);

module.exports = router;
