// This model is more for storing aggregated daily reports if needed,
// but for this request, reports will be generated on-the-fly from Booking and Food models.
// So, this file might not be strictly necessary for the initial implementation.
// However, if historical daily reports need to be stored, this schema would be used.

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  roomBookings: {
    type: Number,
    default: 0,
  },
  hallBookings: {
    type: Number,
    default: 0,
  },
  foodOrdersCount: {
    type: Number,
    default: 0,
  },
  topFoodItems: [
    {
      name: String,
      count: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);
