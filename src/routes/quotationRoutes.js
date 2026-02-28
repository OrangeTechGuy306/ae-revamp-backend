const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.post('/', quotationController.createQuotation);
router.get('/', authMiddleware, adminMiddleware, quotationController.getAllQuotations);
router.get('/:id', authMiddleware, adminMiddleware, quotationController.getQuotationById);
router.delete('/:id', authMiddleware, adminMiddleware, quotationController.deleteQuotation);

module.exports = router;
