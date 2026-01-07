'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'Active' | 'History' | 'Disputes'>('Active')

  const activeBookings = [
    {
      id: 'BW-9021',
      title: 'AC Repair & Service',
      date: 'Today, 02:00 PM - 04:00 PM',
      status: 'searching',
      description: 'Searching for technician...',
      details: 'Notifying experts near you'
    },
    {
      id: 'BW-8842',
      title: 'Home Deep Cleaning',
      date: 'Tomorrow, 10:00 AM',
      status: 'scheduled',
    }
  ]

  const historyBookings = [
    {
      id: 'BW-9021',
      title: 'AC Cooling Check',
      date: 'Today, 10:30 AM',
      technician: 'Rajesh Kumar',
      status: 'completed',
      price: '$25.00',
      action: 'Rate Service'
    },
    {
      id: 'BW-8832',
      title: 'Switchboard Repair',
      date: 'Aug 24, 2:00 PM',
      status: 'completed',
      price: '$25.00',
      details: 'Completed successfully',
      action: 'View Details >'
    },
    {
      id: 'BW-7102',
      title: 'Kitchen Sink Unclog',
      date: 'Jul 12, 11:15 AM',
      status: 'completed',
      price: '$40.00',
      details: 'Completed successfully',
      action: 'View Details >'
    }
  ]

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Bookings</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {['Active', 'History', 'Disputes'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-sm font-medium ${activeTab === tab ? 'text-yellow-600 border-b-2 border-yellow-500' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active Bookings */}
      {activeTab === 'Active' && (
        <div className="p-4 space-y-4">
          {activeBookings.map((booking) => (
            <div key={booking.id} className="border border-gray-300 rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${booking.status === 'searching' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    {booking.status === 'searching' ? 'NEW LEAD' : 'SCHEDULED'}
                  </div>
                  <h3 className="font-bold text-gray-800">{booking.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{booking.date}</p>
                </div>
              </div>

              {booking.status === 'searching' && (
                <div className="mb-4">
                  <div className="text-gray-800 font-medium mb-1">{booking.description}</div>
                  <p className="text-gray-600 text-sm">{booking.details}</p>
                </div>
              )}

              <Link
                href={`/bookings/${booking.id}`}
                className="text-yellow-600 font-medium text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* History Bookings */}
      {activeTab === 'History' && (
        <div className="p-4 space-y-4">
          {historyBookings.map((booking) => (
            <div key={booking.id} className="border border-gray-300 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{booking.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">Booking #{booking.id}</p>
                  <p className="text-gray-600 text-sm">{booking.date}</p>
                  {booking.technician && (
                    <div className="flex items-center mt-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-700">{booking.technician}</span>
                    </div>
                  )}
                  {booking.details && (
                    <p className="text-green-600 text-sm mt-2">✓ {booking.details}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800">{booking.price}</div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium">
                  Invoice
                </button>
                <Link
                  href="/feedback"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium"
                >
                  {booking.action}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disputes Tab */}
      {activeTab === 'Disputes' && (
        <div className="p-4">
          <div className="border border-gray-300 rounded-xl p-4 mb-6">
            <div className="mb-6">
              <div className="text-sm text-yellow-600 font-medium mb-2">Issue Under Review</div>
              <div className="font-bold text-gray-800">WARRANTY CLAIM</div>
              <div className="text-gray-600">AC Repair & Servicing</div>
              <div className="text-sm text-gray-500">Booking ID: #BWA-9821 • Completed: Oct 24, 2023</div>
            </div>

            {/* Claim Status */}
            <div className="space-y-6 mb-6">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                  1
                </div>
                <div>
                  <div className="font-medium text-gray-800">Claim Submitted</div>
                  <div className="text-sm text-gray-600">Oct 25, 10:30 AM</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                  2
                </div>
                <div>
                  <div className="font-medium text-gray-800">Under Review</div>
                  <div className="text-sm text-gray-600">Our team is reviewing the technician report regarding the cooling issue.</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs font-bold mr-3">
                  3
                </div>
                <div className="text-gray-400">
                  <div className="font-medium">Resolution</div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-yellow-500 text-white rounded-lg font-bold mb-4">
              Contact Support
            </button>
            
            <div className="text-center text-sm text-gray-600">
              <p>We're here to help</p>
              <p>We resolve 95% of warranty claims within 24 hours. Your satisfaction is our priority.</p>
            </div>
          </div>

          {/* Recent History */}
          <div className="border border-gray-300 rounded-xl p-4">
            <div className="text-sm text-gray-600 mb-2">Recent History</div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-green-600">RESOLVED</div>
                <div className="text-sm">Switch Board Repair</div>
                <div className="text-xs text-gray-500">ID: #BWA-4421 • Sep 12, 2023</div>
              </div>
              <button className="text-yellow-600 text-sm font-medium">
                View Resolution →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-gray-500 text-sm">Home</Link>
          <Link href="/services" className="text-gray-500 text-sm">Services</Link>
          <Link href="/cart" className="text-gray-500 text-sm">Cart</Link>
          <Link href="/profile" className="text-gray-500 text-sm">Profile</Link>
        </div>
      </div>
    </div>
  )
}