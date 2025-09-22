import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { User, Mail, CalendarCheck, Loader2, XCircle } from 'lucide-react'
import axios from 'axios'

interface Booking {
  _id: string;
  user: string;
  room?: {
    id: string;
    type: string;
    price: number;
  };
  hall?: {
    id: string;
    type: string;
    price: number;
  };
  checkInDate?: string;
  checkOutDate?: string;
  foodOrders: Array<{ foodId: string; name: string; quantity: number; price: number }>;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { user, token, logout } = useAuthStore()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !token) {
      navigate('/login')
      return
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBookings(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch bookings.')
        if (err.response?.status === 401) {
          logout()
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [user, token, navigate, logout])

  if (!user) {
    return null // Should redirect to login, but good to have a fallback
  }

  return (
    <div className="container mx-auto py-12 animate-fade-in">
      <h1 className="text-5xl font-bold text-primary text-center mb-12">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* User Info Card */}
        <div className="lg:col-span-1 bg-surface p-8 rounded-xl shadow-2xl border border-border h-fit">
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center mb-4 border-4 border-primary">
              <User className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-text mb-2">{user.name}</h2>
            <p className="text-textSecondary flex items-center gap-2">
              <Mail className="w-5 h-5" /> {user.email}
            </p>
            <span className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold ${
              user.role === 'admin' ? 'bg-accent/20 text-accent' : 'bg-secondary/20 text-secondary'
            }`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
          </div>

          <button
            onClick={logout}
            className="w-full bg-error text-white py-3 rounded-xl font-semibold text-lg hover:bg-error/80 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-2 bg-surface p-8 rounded-xl shadow-2xl border border-border">
          <h2 className="text-3xl font-bold text-text mb-8 flex items-center gap-3">
            <CalendarCheck className="w-7 h-7 text-primary" /> Your Bookings
          </h2>

          {loading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="ml-4 text-textSecondary text-lg">Loading bookings...</p>
            </div>
          )}

          {error && (
            <div className="bg-error/20 text-error p-4 rounded-xl flex items-center gap-3">
              <XCircle className="w-6 h-6" />
              <p>{error}</p>
            </div>
          )}

          {!loading && bookings.length === 0 && !error && (
            <div className="text-center py-10 text-textSecondary text-lg">
              <p className="mb-4">You haven't made any bookings yet.</p>
              <Link to="/book" className="text-primary hover:underline font-medium">
                Start your first booking!
              </Link>
            </div>
          )}

          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-background p-6 rounded-xl border border-border shadow-md">
                <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-3">
                  <h3 className="text-xl font-semibold text-text">Booking ID: <span className="text-primary">{booking._id.substring(0, 8)}...</span></h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'Confirmed' ? 'bg-success/20 text-success' :
                    booking.status === 'Pending' ? 'bg-warning/20 text-warning' :
                    'bg-error/20 text-error'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                {booking.room && (
                  <p className="text-textSecondary mb-2">
                    <span className="font-medium text-text">Room:</span> {booking.room.type} (${booking.room.price}/night)
                  </p>
                )}
                {booking.hall && (
                  <p className="text-textSecondary mb-2">
                    <span className="font-medium text-text">Hall:</span> {booking.hall.type} (${booking.hall.price}/event)
                  </p>
                )}
                {booking.checkInDate && booking.checkOutDate && (
                  <p className="text-textSecondary mb-2">
                    <span className="font-medium text-text">Dates:</span> {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                )}

                {booking.foodOrders && booking.foodOrders.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="font-medium text-text mb-2">Food Orders:</p>
                    <ul className="list-disc list-inside text-textSecondary">
                      {booking.foodOrders.map((food, idx) => (
                        <li key={idx}>{food.name} x {food.quantity} (${(food.price * food.quantity).toFixed(2)})</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
                  <p className="text-textSecondary text-sm">Booked on: {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <p className="text-2xl font-bold text-primary">Total: ${booking.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
