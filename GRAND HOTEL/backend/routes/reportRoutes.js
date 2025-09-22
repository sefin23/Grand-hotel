const express = require('express');
const router = express.Router();
const { getDailySummaryReport } = require('../controllers/reportController');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/daily', protect, authorizeAdmin, getDailySummaryReport);

module.exports = router;
