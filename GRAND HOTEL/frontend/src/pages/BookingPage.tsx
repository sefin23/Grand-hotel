import React, { useState } from 'react'
import BookingForm from '../components/BookingForm'
import axios from 'axios'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const BookingPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { token, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleBookingSubmit = async (bookingDetails: any) => {
    if (!user || !token) {
      setError('You must be logged in to make a booking.')
      navigate('/login')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSuccess('Booking confirmed! You will receive an email shortly.')
      // Optionally, redirect to a confirmation page or profile page
      // navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.')
      if (err.response?.status === 401) {
        logout()
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12">
      <BookingForm onSubmit={handleBookingSubmit} loading={loading} error={error} success={success} />
    </div>
  )
}

export default BookingPage
