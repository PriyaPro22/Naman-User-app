'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function BookingTrackingPage() {
  const params = useParams()
  const id = params.id as string
  
  const [otp] = useState('8291')

  const statusSteps = [
    { id: 1, title: 'Booking Confirmed', time: '09:30 AM, 14 Oct', completed: true },
    { id: 2, title: 'Technician Assigned', time: 'Richard is on the way', completed: true },
    { id: 3, title: 'Job Started', time: 'Pending', completed: false },
    { id: 4, title: 'Payment & Rating', time: 'Pending', completed: false },
  ]

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">CURRENT STATUS</div>
          <div className="text-lg font-bold text-green-600">Technician Assigned</div>
          <div className="text-sm text-gray-600 mt-1">Arriving in approx 25 mins</div>
        </div>
      </div>

      <div className="p-4">
        {/* Booking ID */}
        <div className="text-center mb-6">
          <div className="text-sm text-gray-600">Booking ID</div>
          <div className="text-2xl font-bold text-gray-800">#BWA-99281</div>
        </div>

        {/* Technician Card */}
        <div className="border border-gray-300 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              RS
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Richard Sharma</h3>
              <div className="text-gray-600 text-sm mt-1">Certified Electrician • 5 Yrs Exp</div>
              <div className="text-yellow-500 text-sm mt-1">★ 4.8 (120 reviews)</div>
            </div>
          </div>

          {/* OTP Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Start Code (OTP)</div>
              <div className="text-3xl font-bold tracking-widest mb-2">{otp}</div>
              <div className="text-xs text-gray-500">Share upon arrival</div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-yellow-500 text-white rounded-lg font-bold">
              Call
            </button>
            <button className="flex-1 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-bold">
              Chat
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className="border border-gray-300 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Service Details</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-600">Service Type</div>
              <div className="font-medium text-gray-800">Fan Repair & Installation</div>
              <div className="text-sm text-gray-600 mt-1">1 Fan • Inspection Included</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Scheduled Date</div>
                <div className="font-medium text-gray-800">Today, 14 Oct 2023</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Time Slot</div>
                <div className="font-medium text-gray-800">02:00 PM - 04:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="border border-gray-300 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-lg mb-6 text-gray-800">Tracking Order</h3>
          
          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                    {step.completed ? (
                      <div className="text-white font-bold">✓</div>
                    ) : (
                      <div className="text-gray-500 font-bold">{index + 1}</div>
                    )}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="font-semibold text-gray-800">{step.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center text-gray-600 text-sm mb-6">
          <p>Need help with this booking?</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold">
            Reschedule Booking
          </button>
          <button className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold">
            Cancel Booking
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <button className="text-gray-500">Home</button>
          <button className="text-gray-500">Bookings</button>
          <button className="text-gray-500">Wallet</button>
          <button className="text-gray-500">Profile</button>
        </div>
      </div>
    </div>
  )
}