const Booking = require('../models/Booking');

// @desc    Generate daily summary report
// @route   GET /api/reports/daily
// @access  Private/Admin
const getDailySummaryReport = async (req, res) => {
  const { date } = req.query; // Expecting 'YYYY-MM-DD'

  if (!date) {
    return res.status(400).json({ message: 'Date parameter is required for daily report.' });
  }

  try {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: 'Confirmed', // Only count confirmed bookings for reports
    });

    let totalBookings = bookings.length;
    let totalRevenue = 0;
    let roomBookings = 0;
    let hallBookings = 0;
    let foodOrdersCount = 0;
    const foodItemCounts = {};

    bookings.forEach(booking => {
      totalRevenue += booking.totalAmount;
      if (booking.room) roomBookings++;
      if (booking.hall) hallBookings++;
      booking.foodOrders.forEach(food => {
        foodOrdersCount += food.quantity;
        foodItemCounts[food.name] = (foodItemCounts[food.name] || 0) + food.quantity;
      });
    });

    const topFoodItems = Object.entries(foodItemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 food items

    res.json({
      date: startOfDay.toISOString().split('T')[0],
      totalBookings,
      totalRevenue,
      roomBookings,
      hallBookings,
      foodOrdersCount,
      topFoodItems,
    });
  } catch (error) {
    console.error('Error generating daily summary report:', error);
    res.status(500).json({ message: 'Server error. Could not generate report.' });
  }
};

module.exports = {
  getDailySummaryReport,
};
