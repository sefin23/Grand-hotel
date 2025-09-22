const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  initiatePayment,
  verifyPayment,
} = require('../controllers/bookingController');
const { protect, authorizeAdmin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.post('/:id/pay', protect, initiatePayment);
router.post('/:id/verify-payment', protect, verifyPayment);


// Admin routes
router.get('/all', protect, authorizeAdmin, getAllBookings);
router.put('/:id/status', protect, authorizeAdmin, updateBookingStatus);

module.exports = router;
