import React from 'react'
import { Link } from 'react-router-dom'
import { Bed, Users, CalendarCheck, Utensils, ArrowRight } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden rounded-xl shadow-2xl mb-16">
        <img
          src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Luxury Hotel Room"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="relative z-10 text-white p-8 max-w-4xl animate-fade-in-up">
          <h1 className="text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Your Perfect Stay, Every Time.
          </h1>
          <p className="text-xl mb-10 font-light opacity-90">
            Discover exquisite rooms, state-of-the-art auditoriums, and seamless booking experiences with BoltStay.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-accent transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            <CalendarCheck className="w-7 h-7" /> Book Your Experience
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-surface rounded-xl shadow-xl border border-border mb-16 animate-fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-text mb-12">Why Choose BoltStay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-lg border border-border transform hover:scale-105 transition-transform duration-300">
              <Bed className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-semibold text-text mb-3">Luxurious Rooms</h3>
              <p className="text-textSecondary leading-relaxed">
                From cozy singles to spacious family suites, find the perfect room for your comfort.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-lg border border-border transform hover:scale-105 transition-transform duration-300">
              <Users className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-semibold text-text mb-3">Versatile Venues</h3>
              <p className="text-textSecondary leading-relaxed">
                Book auditoriums and conference rooms for events of any scale.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-lg border border-border transform hover:scale-105 transition-transform duration-300">
              <Utensils className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-semibold text-text mb-3">Gourmet Dining</h3>
              <p className="text-textSecondary leading-relaxed">
                Enhance your booking with delicious food options tailored to your taste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent rounded-xl shadow-2xl text-white text-center mb-16 animate-fade-in-up">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-md">Ready to Book Your Stay?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Experience the future of hospitality. Secure your booking today and enjoy exclusive benefits.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Get Started <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Testimonials (Placeholder) */}
      <section className="py-16 bg-background rounded-xl shadow-xl border border-border animate-fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-text mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <blockquote className="bg-surface p-8 rounded-xl shadow-lg border border-border relative">
              <p className="text-text text-lg italic mb-6">
                "BoltStay exceeded all my expectations! The room was luxurious, the service impeccable, and the booking process was a breeze. Highly recommend!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Client 1"
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-text">Jane Doe</p>
                  <p className="text-sm text-textSecondary">Business Traveler</p>
                </div>
              </div>
            </blockquote>
            <blockquote className="bg-surface p-8 rounded-xl shadow-lg border border-border relative">
              <p className="text-text text-lg italic mb-6">
                "Booking our conference at BoltStay was the best decision. The auditorium was perfect, and the catering options were fantastic. Our event was a huge success!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Client 2"
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-text">John Smith</p>
                  <p className="text-sm text-textSecondary">Event Organizer</p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage