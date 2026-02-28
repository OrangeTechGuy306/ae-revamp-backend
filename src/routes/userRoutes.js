const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);
router.post('/', authMiddleware, adminMiddleware, userController.createUser);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
