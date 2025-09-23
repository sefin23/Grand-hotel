import express from 'express';
import Booking from '../models/Booking.js';
import { authenticateToken, requireAdmin } from '../controllers/auth.js';

const router = express.Router();

// Get daily report
router.get('/daily', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const bookings = await Booking.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate
      }
    });

    const report = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
      roomBookings: bookings.filter(b => b.room).length,
      hallBookings: bookings.filter(b => b.hall).length,
      foodOrdersCount: bookings.reduce((sum, booking) => sum + booking.foodOrders.length, 0),
      topFoodItems: []
    };

    // Calculate top food items
    const foodCounts = {};
    bookings.forEach(booking => {
      booking.foodOrders.forEach(food => {
        foodCounts[food.name] = (foodCounts[food.name] || 0) + food.quantity;
      });
    });

    report.topFoodItems = Object.entries(foodCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;