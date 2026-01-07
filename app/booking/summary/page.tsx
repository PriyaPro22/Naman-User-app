'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BookingSummaryPage() {
  const [selectedTip, setSelectedTip] = useState<number | null>(20)
  const [scheduleType, setScheduleType] = useState<'instant' | 'later'>('instant')

  const services = [
    {
      name: 'Split AC Service',
      description: 'Includes filter cleaning & gas check',
      price: 599,
      quantity: 1,
    },
    {
      name: 'Gas Refill (Top-up)',
      description: 'Up to 150 PSI',
      price: 1499,
      quantity: 1,
    }
  ]

  const subtotal = 2098
  const convenienceFee = 49
  const taxes = 386
  const discount = 100
  const total = subtotal + convenienceFee + taxes - discount

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <h1 className="text-xl font-bold text-gray-800">Booking Summary</h1>
      </div>

      <div className="p-4">
        {/* Selected Services */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Selected Services</h2>
          
          {services.map((service, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">{service.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">${service.price}</div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600">-</span>
                </button>
                <span className="mx-3 font-medium">{service.quantity}</span>
                <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-600">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Service */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Schedule Service</h2>
          <div className="flex space-x-4 mb-2">
            <button
              onClick={() => setScheduleType('instant')}
              className={`flex-1 py-3 rounded-lg border-2 ${scheduleType === 'instant' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'}`}
            >
              <span className="font-medium">Instant Service</span>
            </button>
            <button
              onClick={() => setScheduleType('later')}
              className={`flex-1 py-3 rounded-lg border-2 ${scheduleType === 'later' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'}`}
            >
              <span className="font-medium">Schedule Later</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm">Tap above to change schedule time</p>
        </div>

        {/* Address */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <button className="text-yellow-600 font-semibold">CHANGE</button>
          </div>
          <div className="border border-gray-300 rounded-xl p-4">
            <div className="font-medium text-gray-800 mb-1">Home</div>
            <p className="text-gray-600 text-sm">Flat 402, Green Valley Apartments, Sector 2, New Delhi</p>
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Delivery Instructions</h2>
          <textarea
            placeholder="Add notes for the technician (e.g., Gate code, Call upon arrival)"
            className="w-full h-32 p-4 border border-gray-300 rounded-xl"
          />
        </div>

        {/* Offers & Benefits */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Offers & Benefits</h2>
          <div className="space-y-3">
            <div className="border border-yellow-300 rounded-xl p-4 bg-yellow-50">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Enter Coupon Code</div>
                  <div className="font-medium text-gray-800 mt-1">Save $100 with SUMMER24</div>
                  <button className="text-yellow-600 text-sm mt-1">VIEW ALL COUPONS</button>
                </div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium">
                  Apply
                </button>
              </div>
            </div>
            <div className="border border-green-300 rounded-xl p-4 bg-green-50">
              <div className="font-medium text-gray-800">10% Off on AC Service</div>
            </div>
          </div>
        </div>

        {/* Tip Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Tip your Technician</h2>
          <p className="text-gray-600 text-sm mb-4">
            Your kindness means a lot! 100% of the tip goes to the technician.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[20, 50, 100, 'Custom'].map((amount) => (
              <button
                key={amount.toString()}
                onClick={() => setSelectedTip(typeof amount === 'number' ? amount : null)}
                className={`py-3 rounded-lg border ${selectedTip === amount ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'}`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">Payment Summary</h2>
          <div className="border border-gray-300 rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Total</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Convenience Fee</span>
                <span className="font-medium">$49</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes (18% GST)</span>
                <span className="font-medium">$386</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-$100</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Grand Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="text-sm text-gray-600 mb-8">
          <p>
            Free cancellation up to 2 hours before the service. A fee of $50 applies for 
            cancellations made within 2 hours. <span className="text-yellow-600 font-medium">Read More</span>
          </p>
        </div>
      </div>

      {/* Bottom Payment Bar - EXACT like image */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm text-gray-600">Total to pay</div>
            <div className="text-2xl font-bold text-gray-800">${total}</div>
          </div>
          <Link
            href="/payment"
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600"
          >
            Proceed to Payment
          </Link>
        </div>
        <button className="text-yellow-600 text-sm w-full text-center">
          View detailed bill
        </button>
      </div>
    </div>
  )
}