'use client'

import { Phone, MessageSquare, MapPin, Calendar, Clock, User, Shield } from 'lucide-react'
import { useState } from 'react'

export default function TrackingPage() {
  const [otp] = useState('8291')

  const statusSteps = [
    { id: 1, title: 'Booking Confirmed', time: '09:30 AM, 14 Oct', completed: true },
    { id: 2, title: 'Technician Assigned', time: 'Richard is on the way', completed: true },
    { id: 3, title: 'Job Started', time: 'Pending', completed: false },
    { id: 4, title: 'Payment & Rating', time: 'Pending', completed: false },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Current Status Header */}
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-1">CURRENT STATUS</div>
        <div className="text-lg font-bold text-green-600">Technician Assigned</div>
        <div className="text-sm text-gray-600 mt-1">Arriving in approx 25 mins</div>
      </div>

      {/* Booking ID */}
      <div className="text-center">
        <div className="text-sm text-gray-500">Booking ID</div>
        <div className="text-xl font-bold">#BWA-99281</div>
      </div>

      {/* Technician Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            RS
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Richard Sharma</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <Shield className="h-4 w-4 mr-1" />
              Certified Electrician • 5 Yrs Exp
            </div>
            <div className="flex items-center text-yellow-500 text-sm mt-1">
              ⭐ 4.8 (120 reviews)
            </div>
          </div>
        </div>

        {/* OTP Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Start Code (OTP)</div>
            <div className="text-3xl font-bold tracking-widest mb-2">{otp}</div>
            <div className="text-xs text-gray-500">Share upon arrival</div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex space-x-3 mt-4">
          <button className="flex-1 flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg font-semibold">
            <Phone className="h-5 w-5 mr-2" />
            Call
          </button>
          <button className="flex-1 flex items-center justify-center py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold">
            <MessageSquare className="h-5 w-5 mr-2" />
            Chat
          </button>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        <h3 className="font-bold text-lg">Service Details</h3>
        
        <div>
          <div className="text-sm text-gray-500">Service Type</div>
          <div className="font-medium">Fan Repair & Installation</div>
          <div className="text-sm text-gray-600 mt-1">1 Fan • Inspection Included</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Scheduled Date</div>
            <div className="font-medium">Today, 14 Oct 2023</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Time Slot</div>
            <div className="font-medium">02:00 PM - 04:00 PM</div>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Tracking Order</h3>
        
        <div className="space-y-6">
          {statusSteps.map((step, index) => (
            <div key={step.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
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
                <div className="font-semibold">{step.title}</div>
                <div className="text-sm text-gray-600 mt-1">{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="text-center text-gray-600 text-sm">
        <p>Need help with this booking?</p>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 shadow-lg md:static">
        <div className="flex space-x-3">
          <button className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold">
            Reschedule Booking
          </button>
          <button className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  )
}