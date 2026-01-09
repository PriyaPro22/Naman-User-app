'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ShoppingBag, User, Home } from 'lucide-react'

export default function ACServicePage() {
  const [quantity, setQuantity] = useState(1)




  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-6 pb-4 border-b">
        <div className="flex items-center mb-4">
          <Link href="/services" className="mr-3">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Advanced Foam Jet Service</h1>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600">45 Days Warranty</span>
              <span className="mx-2">•</span>
              <span className="text-sm text-gray-600">Servicing 15+ Brands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24">
        {/* Price Card */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-6 mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">TOTAL SERVICE COST</div>
            <div className="flex items-center justify-center space-x-3">
              <div className="text-3xl font-bold text-gray-800">$599</div>
              <div className="text-lg text-gray-500 line-through">$999</div>
            </div>
            <div className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              33% OFF
            </div>
            <p className="text-gray-600 text-sm mt-2">Inclusive of all taxes</p>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-800">How it works</h2>
          <div className="space-y-6">
            <div className="flex">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Technician Arrival & Safety</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Our verified technician arrives in uniform, wearing a mask and carrying a sanitization kit.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Service Documentation</h3>
                <p className="text-gray-600 text-sm mt-1">Detailed service report with before-after photos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Documentation Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Service Documentation</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">1. Technician Arrival & Safety</h3>
              <p className="text-gray-600 text-sm">
                Our verified technician arrives in uniform, wearing a mask and carrying a sanitization kit. 
                A safety check is performed before entering.
              </p>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
          <span className="font-medium text-gray-800">Quantity</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg bg-white"
            >
              <span className="text-gray-600">-</span>
            </button>
            <span className="text-xl font-bold text-gray-800">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg bg-white"
            >
              <span className="text-gray-600">+</span>
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="mb-8">
          <div className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-xl">
            <div>
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-2xl font-bold text-gray-800">${(599 * quantity).toLocaleString()}</div>
            </div>
            <div className="text-green-600 font-semibold">
              SAVE ${(400 * quantity).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm text-gray-600">1 ITEM • $599</div>
            <div className="text-sm text-gray-600">Extra charges may apply</div>
          </div>
          <Link 
            href="/booking/summary"
            className="text-yellow-600 font-bold text-sm"
          >
            View Bill Details
          </Link>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            href="/booking/summary"
            className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-bold text-center"
          >
            Add to Cart
          </Link>
          <Link 
            href="/booking/summary"
            className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-bold text-center"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  )
}