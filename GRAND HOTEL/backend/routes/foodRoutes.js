const express = require('express');
const router = express.Router();
const {
  getFoodItems,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require('../controllers/foodController');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

// Public route to get all food items (for booking form)
router.get('/', getFoodItems);

// Admin routes for managing food items
router.post('/', protect, authorizeAdmin, createFoodItem);
router.put('/:id', protect, authorizeAdmin, updateFoodItem);
router.delete('/:id', protect, authorizeAdmin, deleteFoodItem);

module.exports = router;
