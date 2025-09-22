const Booking = require('../models/Booking');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

// Dummy data for room/hall options (should ideally come from a DB)
const roomOptions = [
  { id: 'single-ac', type: 'Single Room (AC)', price: 100 },
  { id: 'single-non-ac', type: 'Single Room (Non-AC)', price: 70 },
  { id: 'double-ac', type: 'Double Room (AC)', price: 150 },
  { id: 'double-non-ac', type: 'Double Room (Non-AC)', price: 110 },
  { id: 'family-ac', type: 'Family Room (AC)', price: 220 },
  { id: 'family-non-ac', type: 'Family Room (Non-AC)', price: 180 },
];

const hallOptions = [
  { id: 'hall-150', type: 'Auditorium (150 Seats)', price: 500 },
  { id: 'hall-300', type: 'Auditorium (300 Seats)', price: 800 },
  { id: 'hall-2000', type: 'Auditorium (2000 Seats)', price: 2500 },
  { id: 'conference-room', type: 'Conference Room', price: 300 },
];

const foodOptions = [
  { id: 'pizza', name: 'Pizza', price: 15 },
  { id: 'burger', name: 'Burger', price: 10 },
  { id: 'pasta', name: 'Pasta', price: 12 },
  { id: 'salad', name: 'Salad', price: 8 },
  { id: 'coffee', name: 'Coffee', price: 4 },
  { id: 'juice', name: 'Fresh Juice', price: 5 },
];

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Use 'true' if your port is 465 (SSL/TLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const {
    bookingType,
    checkInDate,
    checkOutDate,
    room: roomId,
    hall: hallId,
    foodOrders: rawFoodOrders,
    totalAmount,
  } = req.body;

  if (!bookingType || !totalAmount) {
    return res.status(400).json({ message: 'Booking type and total amount are required.' });
  }

  if ((bookingType === 'room' || bookingType === 'both') && (!checkInDate || !checkOutDate)) {
    return res.status(400).json({ message: 'Check-in and Check-out dates are required for room bookings.' });
  }

  let roomDetails = null;
  if (roomId) {
    const selectedRoom = roomOptions.find(r => r.id === roomId);
    if (!selectedRoom) return res.status(400).json({ message: 'Invalid room selected.' });
    roomDetails = { id: selectedRoom.id, type: selectedRoom.type, price: selectedRoom.price };
  }

  let hallDetails = null;
  if (hallId) {
    const selectedHall = hallOptions.find(h => h.id === hallId);
    if (!selectedHall) return res.status(400).json({ message: 'Invalid hall selected.' });
    hallDetails = { id: selectedHall.id, type: selectedHall.type, price: selectedHall.price };
  }

  const foodItems = rawFoodOrders.map(order => {
    const foodItem = foodOptions.find(f => f.id === order.foodId);
    if (!foodItem) throw new Error(`Food item ${order.foodId} not found.`);
    return {
      foodId: foodItem.id,
      name: foodItem.name,
      quantity: order.quantity,
      price: foodItem.price,
    };
  });

  try {
    const booking = new Booking({
      user: req.user._id,
      bookingType,
      room: roomDetails,
      hall: hallDetails,
      checkInDate,
      checkOutDate,
      foodOrders: foodItems,
      totalAmount,
      status: 'Pending', // Initial status
      paymentStatus: 'Pending',
    });

    await booking.save();

    // Send booking confirmation email
    const user = await User.findById(req.user._id);
    if (user) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'BoltStay Booking Confirmation',
        html: `
          <h1>Hello ${user.name},</h1>
          <p>Your booking with BoltStay has been received and is currently <strong>${booking.status}</strong>.</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p><strong>Total Amount:</strong> ₹${booking.totalAmount.toFixed(2)}</p>
          ${booking.room ? `<p><strong>Room:</strong> ${booking.room.type} (₹${booking.room.price}/night)</p>` : ''}
          ${booking.hall ? `<p><strong>Hall:</strong> ${booking.hall.type} (₹${booking.hall.price}/event)</p>` : ''}
          ${booking.checkInDate ? `<p><strong>Check-in Date:</strong> ${new Date(booking.checkInDate).toLocaleDateString()}</p>` : ''}
          ${booking.checkOutDate ? `<p><strong>Check-out Date:</strong> ${new Date(booking.checkOutDate).toLocaleDateString()}</p>` : ''}
          ${foodItems.length > 0 ? `
            <p><strong>Food Orders:</strong></p>
            <ul>
              ${foodItems.map(item => `<li>${item.name} x ${item.quantity} (₹${(item.price * item.quantity).toFixed(2)})</li>`).join('')}
            </ul>
          ` : ''}
          <p>We will notify you once your booking is confirmed.</p>
          <p>Thank you for choosing BoltStay!</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(201).json({ message: 'Booking created successfully. Confirmation email sent.', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error. Could not create booking.' });
  }
};

// @desc    Get all bookings for the logged-in user
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error. Could not fetch bookings.' });
  }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings/all
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ message: 'Server error. Could not fetch all bookings.' });
  }
};

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    booking.status = status;
    await booking.save();

    // Send status update email
    const user = await User.findById(booking.user);
    if (user) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'BoltStay Booking Status Update',
        html: `
          <h1>Hello ${user.name},</h1>
          <p>Your booking (ID: ${booking._id}) status has been updated to <strong>${booking.status}</strong>.</p>
          <p>Thank you for choosing BoltStay!</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending status update email:', error);
        } else {
          console.log('Status update email sent:', info.response);
        }
      });
    }

    res.json({ message: 'Booking status updated successfully.', booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error. Could not update booking status.' });
  }
};

// @desc    Initiate Razorpay payment
// @route   POST /api/bookings/:id/pay
// @access  Private
const initiatePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    if (booking.paymentStatus === 'Paid') {
      return res.status(400).json({ message: 'Booking already paid.' });
    }

    const options = {
      amount: booking.totalAmount * 100, // amount in smallest currency unit (paise)
      currency: 'INR', // Indian Rupees
      receipt: `receipt_order_${booking._id}`,
      payment_capture: 1, // auto capture
    };

    const order = await razorpay.orders.create(options);

    booking.razorpayOrderId = order.id;
    await booking.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Server error. Could not initiate payment.' });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/bookings/:id/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
  const { id } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      booking.paymentStatus = 'Paid';
      booking.status = 'Confirmed'; // Auto-confirm on successful payment
      booking.razorpayPaymentId = razorpay_payment_id;
      await booking.save();

      // Send payment confirmation email
      const user = await User.findById(booking.user);
      if (user) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'BoltStay Payment & Booking Confirmation',
          html: `
            <h1>Hello ${user.name},</h1>
            <p>Your payment for booking ID: ${booking._id} was successful!</p>
            <p>Your booking is now <strong>Confirmed</strong>.</p>
            <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
            <p><strong>Total Amount Paid:</strong> ₹${booking.totalAmount.toFixed(2)}</p>
            <p>Thank you for choosing BoltStay!</p>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending payment confirmation email:', error);
          } else {
            console.log('Payment confirmation email sent:', info.response);
          }
        });
      }

      res.json({ message: 'Payment successful and booking confirmed!', booking });
    } else {
      res.status(400).json({ message: 'Payment verification failed.' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server error. Could not verify payment.' });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  initiatePayment,
  verifyPayment,
};
