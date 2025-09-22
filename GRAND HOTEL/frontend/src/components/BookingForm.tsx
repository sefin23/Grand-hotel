import React, { useState } from 'react'
import { Calendar, Users, Utensils, DollarSign, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import RoomCard from './RoomCard'
import HallCard from './HallCard'
import FoodItem from './FoodItem'

interface BookingFormProps {
  onSubmit: (bookingDetails: any) => void;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const roomOptions = [
  { id: 'single-ac', type: 'Single Room (AC)', capacity: '1-2 Guests', features: ['AC', 'Free Wifi', 'Smart TV'], price: 100, imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'single-non-ac', type: 'Single Room (Non-AC)', capacity: '1-2 Guests', features: ['Non-AC', 'Free Wifi'], price: 70, imageUrl: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'double-ac', type: 'Double Room (AC)', capacity: '2-3 Guests', features: ['AC', 'Free Wifi', 'Smart TV', 'Breakfast Included'], price: 150, imageUrl: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'double-non-ac', type: 'Double Room (Non-AC)', capacity: '2-3 Guests', features: ['Non-AC', 'Free Wifi'], price: 110, imageUrl: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'family-ac', type: 'Family Room (AC)', capacity: '3-5 Guests', features: ['AC', 'Free Wifi', 'Smart TV', 'Breakfast Included', 'Mini-Fridge'], price: 220, imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'family-non-ac', type: 'Family Room (Non-AC)', capacity: '3-5 Guests', features: ['Non-AC', 'Free Wifi'], price: 180, imageUrl: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

const hallOptions = [
  { id: 'hall-150', type: 'Auditorium (150 Seats)', capacity: 150, features: ['Sound System', 'Projector', 'Stage'], price: 500, imageUrl: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'hall-300', type: 'Auditorium (300 Seats)', capacity: 300, features: ['Sound System', 'Projector', 'Stage', 'Green Room'], price: 800, imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'hall-2000', type: 'Auditorium (2000 Seats)', capacity: 2000, features: ['Advanced Sound & Light', 'Multiple Projectors', 'Large Stage', 'Backstage Facilities', 'Catering Available'], price: 2500, imageUrl: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { id: 'conference-room', type: 'Conference Room', capacity: 30, features: ['Projector', 'Whiteboard', 'Video Conferencing', 'Coffee/Tea'], price: 300, imageUrl: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
];

const foodOptions = [
  { id: 'pizza', name: 'Pizza', price: 15 },
  { id: 'burger', name: 'Burger', price: 10 },
  { id: 'pasta', name: 'Pasta', price: 12 },
  { id: 'salad', name: 'Salad', price: 8 },
  { id: 'coffee', name: 'Coffee', price: 4 },
  { id: 'juice', name: 'Fresh Juice', price: 5 },
];

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, loading, error, success }) => {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<typeof roomOptions[0] | null>(null)
  const [selectedHall, setSelectedHall] = useState<typeof hallOptions[0] | null>(null)
  const [foodOrders, setFoodOrders] = useState<{ [key: string]: number }>({})
  const [bookingType, setBookingType] = useState<'room' | 'hall' | 'both'>('room')

  const handleFoodQuantityChange = (id: string, increment: boolean) => {
    setFoodOrders((prev) => {
      const newQuantity = increment ? (prev[id] || 0) + 1 : Math.max(0, (prev[id] || 0) - 1)
      return { ...prev, [id]: newQuantity }
    })
  }

  const calculateTotal = () => {
    let total = 0
    if (selectedRoom) {
      const days = checkInDate && checkOutDate ? (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24) : 1
      total += selectedRoom.price * Math.max(1, days)
    }
    if (selectedHall) {
      total += selectedHall.price
    }
    Object.entries(foodOrders).forEach(([foodId, quantity]) => {
      const foodItem = foodOptions.find((item) => item.id === foodId)
      if (foodItem) {
        total += foodItem.price * quantity
      }
    })
    return total
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bookingDetails = {
      checkInDate,
      checkOutDate,
      room: selectedRoom ? selectedRoom.id : null,
      hall: selectedHall ? selectedHall.id : null,
      foodOrders: Object.entries(foodOrders)
        .filter(([, quantity]) => quantity > 0)
        .map(([foodId, quantity]) => ({ foodId, quantity })),
      totalAmount: calculateTotal(),
      bookingType,
    }
    onSubmit(bookingDetails)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 p-8 bg-surface rounded-xl shadow-2xl border border-border animate-fade-in">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">Create Your Booking</h2>

      {/* Booking Type Selection */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => setBookingType('room')}
          className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
            bookingType === 'room' ? 'bg-primary text-white shadow-lg' : 'bg-background text-textSecondary hover:bg-surface-light border border-border'
          }`}
        >
          <Bed className="w-6 h-6" /> Room Booking
        </button>
        <button
          type="button"
          onClick={() => setBookingType('hall')}
          className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
            bookingType === 'hall' ? 'bg-primary text-white shadow-lg' : 'bg-background text-textSecondary hover:bg-surface-light border border-border'
          }`}
        >
          <Users className="w-6 h-6" /> Hall Booking
        </button>
        <button
          type="button"
          onClick={() => setBookingType('both')}
          className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
            bookingType === 'both' ? 'bg-primary text-white shadow-lg' : 'bg-background text-textSecondary hover:bg-surface-light border border-border'
          }`}
        >
          <Calendar className="w-6 h-6" /> Both
        </button>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="checkInDate" className="block text-textSecondary text-sm font-medium mb-2">
            Check-in Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
            <input
              type="date"
              id="checkInDate"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text transition-all duration-200"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required={(bookingType === 'room' || bookingType === 'both')}
            />
          </div>
        </div>
        <div>
          <label htmlFor="checkOutDate" className="block text-textSecondary text-sm font-medium mb-2">
            Check-out Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" size={20} />
            <input
              type="date"
              id="checkOutDate"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text transition-all duration-200"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required={(bookingType === 'room' || bookingType === 'both')}
              min={checkInDate}
            />
          </div>
        </div>
      </div>

      {/* Room Selection */}
      {(bookingType === 'room' || bookingType === 'both') && (
        <section>
          <h3 className="text-3xl font-bold text-text mb-6 flex items-center gap-3">
            <Bed className="w-7 h-7 text-primary" /> Choose Your Room
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomOptions.map((room) => (
              <RoomCard
                key={room.id}
                {...room}
                onSelect={() => setSelectedRoom(room)}
                isSelected={selectedRoom?.id === room.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Hall/Auditorium Selection */}
      {(bookingType === 'hall' || bookingType === 'both') && (
        <section>
          <h3 className="text-3xl font-bold text-text mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-primary" /> Select Hall/Auditorium
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hallOptions.map((hall) => (
              <HallCard
                key={hall.id}
                {...hall}
                onSelect={() => setSelectedHall(hall)}
                isSelected={selectedHall?.id === hall.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Food Management */}
      <section>
        <h3 className="text-3xl font-bold text-text mb-6 flex items-center gap-3">
          <Utensils className="w-7 h-7 text-primary" /> Add Food Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foodOptions.map((food) => (
            <FoodItem
              key={food.id}
              {...food}
              quantity={foodOrders[food.id] || 0}
              onAdd={() => handleFoodQuantityChange(food.id, true)}
              onRemove={() => handleFoodQuantityChange(food.id, false)}
            />
          ))}
        </div>
      </section>

      {/* Total and Submit */}
      <div className="pt-8 border-t border-border flex flex-col items-center gap-6">
        <div className="flex items-center gap-4 text-4xl font-extrabold text-text">
          <DollarSign className="w-8 h-8 text-primary" />
          Total: <span className="text-primary">${calculateTotal().toFixed(2)}</span>
        </div>

        {error && (
          <p className="text-error text-sm text-center bg-error/20 p-3 rounded-xl border border-error animate-shake flex items-center gap-2">
            <XCircle className="w-5 h-5" /> {error}
          </p>
        )}
        {success && (
          <p className="text-success text-sm text-center bg-success/20 p-3 rounded-xl border border-success animate-fade-in flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> {success}
          </p>
        )}

        <button
          type="submit"
          className="w-full max-w-md bg-primary text-white py-4 rounded-xl font-semibold text-xl hover:bg-accent transition-all duration-300 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin" size={24} />}
          Confirm Booking
        </button>
      </div>
    </form>
  )
}

export default BookingForm
