const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingType: {
    type: String,
    enum: ['room', 'hall', 'both'],
    required: true,
  },
  room: {
    id: String, // e.g., 'single-ac'
    type: String, // e.g., 'Single Room (AC)'
    price: Number,
  },
  hall: {
    id: String, // e.g., 'hall-150'
    type: String, // e.g., 'Auditorium (150 Seats)'
    price: Number,
  },
  checkInDate: {
    type: Date,
    required: function() { return this.bookingType === 'room' || this.bookingType === 'both'; }
  },
  checkOutDate: {
    type: Date,
    required: function() { return this.bookingType === 'room' || this.bookingType === 'both'; }
  },
  foodOrders: [
    {
      foodId: String, // e.g., 'pizza'
      name: String, // e.g., 'Pizza'
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: Number, // Price per item at the time of booking
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Pending',
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
