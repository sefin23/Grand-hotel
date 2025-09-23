import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    id: String,
    type: String,
    price: Number
  },
  hall: {
    id: String,
    type: String,
    price: Number
  },
  checkInDate: {
    type: Date
  },
  checkOutDate: {
    type: Date
  },
  foodOrders: [{
    foodId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  bookingType: {
    type: String,
    enum: ['room', 'hall', 'both'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);