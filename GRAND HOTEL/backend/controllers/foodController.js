const FoodItem = require('../models/FoodItem');

// @desc    Get all food items
// @route   GET /api/food
// @access  Public
const getFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Server error. Could not fetch food items.' });
  }
};

// @desc    Create a new food item (Admin only)
// @route   POST /api/food
// @access  Private/Admin
const createFoodItem = async (req, res) => {
  const { name, price, description, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required for a food item.' });
  }

  try {
    const foodItem = new FoodItem({
      name,
      price,
      description,
      category,
    });

    const createdFoodItem = await foodItem.save();
    res.status(201).json(createdFoodItem);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ message: 'Server error. Could not create food item.' });
  }
};

// @desc    Update a food item (Admin only)
// @route   PUT /api/food/:id
// @access  Private/Admin
const updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, available } = req.body;

  try {
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    foodItem.name = name || foodItem.name;
    foodItem.price = price !== undefined ? price : foodItem.price;
    foodItem.description = description || foodItem.description;
    foodItem.category = category || foodItem.category;
    foodItem.available = available !== undefined ? available : foodItem.available;

    const updatedFoodItem = await foodItem.save();
    res.json(updatedFoodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ message: 'Server error. Could not update food item.' });
  }
};

// @desc    Delete a food item (Admin only)
// @route   DELETE /api/food/:id
// @access  Private/Admin
const deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await FoodItem.findByIdAndDelete(id);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.json({ message: 'Food item removed.' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ message: 'Server error. Could not delete food item.' });
  }
};

module.exports = {
  getFoodItems,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
};
