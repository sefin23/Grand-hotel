import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Bed,
  Users,
  Utensils,
  Loader2,
  XCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  Download,
  CalendarCheck,
} from 'lucide-react'
import axios from 'axios'

interface Booking {
  _id: string;
  user: { _id: string; name: string; email: string };
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

interface Report {
  totalBookings: number;
  totalRevenue: number;
  roomBookings: number;
  hallBookings: number;
  foodOrdersCount: number;
  topFoodItems: Array<{ name: string; count: number }>;
}

const AdminDashboardPage: React.FC = () => {
  const { user, token, logout } = useAuthStore()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [report, setReport] = useState<Report | null>(null)
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [loadingReport, setLoadingReport] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    if (!user || user.role !== 'admin' || !token) {
      navigate('/') // Redirect non-admins
      return
    }

    const fetchBookings = async () => {
      setLoadingBookings(true)
      setError(null)
      try {
        const response = await axios.get('http://localhost:5000/api/bookings/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBookings(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch all bookings.')
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout()
          navigate('/login')
        }
      } finally {
        setLoadingBookings(false)
      }
    }

    fetchBookings()
  }, [user, token, navigate, logout])

  useEffect(() => {
    const fetchDailyReport = async () => {
      setLoadingReport(true)
      setError(null)
      try {
        const response = await axios.get(`http://localhost:5000/api/reports/daily?date=${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setReport(response.data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch daily report.')
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout()
          navigate('/login')
        }
      } finally {
        setLoadingReport(false)
      }
    }

    if (user && user.role === 'admin' && token) {
      fetchDailyReport()
    }
  }, [user, token, selectedDate, logout, navigate])

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      )
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update booking status.')
    }
  }

  if (!user || user.role !== 'admin') {
    return null // Should redirect
  }

  return (
    <div className="container mx-auto py-12 animate-fade-in">
      <h1 className="text-5xl font-bold text-primary text-center mb-12 flex items-center justify-center gap-4">
        <LayoutDashboard className="w-10 h-10" /> Admin Dashboard
      </h1>

      {error && (
        <div className="bg-error/20 text-error p-4 rounded-xl flex items-center gap-3 mb-8">
          <XCircle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      )}

      {/* Daily Report Section */}
      <section className="bg-surface p-8 rounded-xl shadow-2xl border border-border mb-12">
        <h2 className="text-3xl font-bold text-text mb-6 flex items-center gap-3">
          <Calendar className="w-7 h-7 text-primary" /> Daily Summary
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="reportDate" className="text-textSecondary font-medium">Select Date:</label>
          <input
            type="date"
            id="reportDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
          <button
            onClick={() => alert('Download report functionality not implemented yet.')}
            className="bg-secondary text-white px-5 py-2 rounded-xl hover:bg-secondary/80 transition-colors duration-300 flex items-center gap-2"
          >
            <Download className="w-5 h-5" /> Download Report
          </button>
        </div>

        {loadingReport ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="ml-4 text-textSecondary text-lg">Loading daily report...</p>
          </div>
        ) : report ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background p-6 rounded-xl border border-border shadow-md flex flex-col items-center justify-center">
              <p className="text-textSecondary text-lg mb-2">Total Bookings</p>
              <span className="text-5xl font-extrabold text-primary">{report.totalBookings}</span>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border shadow-md flex flex-col items-center justify-center">
              <p className="text-textSecondary text-lg mb-2">Total Revenue</p>
              <span className="text-5xl font-extrabold text-success">${report.totalRevenue.toFixed(2)}</span>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border shadow-md flex flex-col items-center justify-center">
              <p className="text-textSecondary text-lg mb-2">Room Bookings</p>
              <span className="text-5xl font-extrabold text-accent">{report.roomBookings}</span>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border shadow-md flex flex-col items-center justify-center">
              <p className="text-textSecondary text-lg mb-2">Hall Bookings</p>
              <span className="text-5xl font-extrabold text-secondary">{report.hallBookings}</span>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border shadow-md lg:col-span-2">
              <p className="text-textSecondary text-lg mb-2 text-center">Food Orders Count</p>
              <span className="text-5xl font-extrabold text-primary block text-center">{report.foodOrdersCount}</span>
            </div>
            <div className="bg-background p-6 rounded-xl border border-border shadow-md lg:col-span-2">
              <p className="text-textSecondary text-lg mb-2 text-center">Top Food Items</p>
              <ul className="space-y-2">
                {report.topFoodItems.length > 0 ? (
                  report.topFoodItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center text-text text-lg">
                      <span>{item.name}</span>
                      <span className="font-semibold text-primary">{item.count} orders</span>
                    </li>
                  ))
                ) : (
                  <p className="text-center text-textSecondary">No food orders for this date.</p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-textSecondary text-lg py-10">No report data available for this date.</p>
        )}
      </section>

      {/* All Bookings Section */}
      <section className="bg-surface p-8 rounded-xl shadow-2xl border border-border">
        <h2 className="text-3xl font-bold text-text mb-8 flex items-center gap-3">
          <CalendarCheck className="w-7 h-7 text-primary" /> All Bookings
        </h2>

        {loadingBookings ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="ml-4 text-textSecondary text-lg">Loading all bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10 text-textSecondary text-lg">
            <p className="mb-4">No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-background">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider rounded-tl-xl">
                    Booking ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Dates
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Food
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-surface transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">
                      {booking._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                      <p className="font-medium text-text">{booking.user.name}</p>
                      <p className="text-xs">{booking.user.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                      {booking.room && <p><Bed className="inline-block w-4 h-4 mr-1" /> {booking.room.type}</p>}
                      {booking.hall && <p><Users className="inline-block w-4 h-4 mr-1" /> {booking.hall.type}</p>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                      {booking.checkInDate && new Date(booking.checkInDate).toLocaleDateString()}
                      {booking.checkOutDate && ` - ${new Date(booking.checkOutDate).toLocaleDateString()}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                      {booking.foodOrders.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {booking.foodOrders.map((food, idx) => (
                            <li key={idx}>{food.name} x {food.quantity}</li>
                          ))}
                        </ul>
                      ) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-primary">
                      ${booking.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'Confirmed' ? 'bg-success/20 text-success' :
                        booking.status === 'Pending' ? 'bg-warning/20 text-warning' :
                        'bg-error/20 text-error'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="bg-background border border-border rounded-xl px-3 py-2 text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminDashboardPage