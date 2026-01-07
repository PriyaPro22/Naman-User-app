"use client";

import { ArrowLeft, Phone, MessageCircle, MapPin, Calendar, Clock, Home, Grid3x3, ShoppingCart, User, Car, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingStatusPage() {
  const router = useRouter();

  const statusSteps = [
    { id: 1, title: 'Booking Confirmed', time: '09:30 AM, 14 Oct', completed: true },
    { id: 2, title: 'Technician Assigned', time: 'Richard is on the way', completed: true },
    { id: 3, title: 'Job Started', time: '', completed: false },
    { id: 4, title: 'Payment & Rating', time: '', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">Booking Status</span>
          </button>
        </div>
      </header>

      <div className="px-4 mt-4">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 text-white mb-6">
          <div className="text-center mb-4">
            <div className="text-sm font-medium text-blue-100 mb-1">CURRENT STATUS</div>
            <div className="text-2xl font-bold">Technician Assigned</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">#BWA-99281</div>
            <div className="text-lg font-medium">Arriving in approx 25 mins</div>
          </div>
        </div>

        {/* Technician Info */}
        <div className="bg-white rounded-xl p-5 shadow-soft mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-card rounded-full flex items-center justify-center">
                <User size={24} className="text-text-gray" />
              </div>
              <div>
                <div className="font-bold text-text-dark">Richard Sharma</div>
                <div className="text-sm text-text-gray">Certified Electrician • 5 Yrs Exp</div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-500">★ 4.8</span>
                  <span className="text-text-gray">(120 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <div className="text-center mb-2">
              <div className="text-sm font-medium text-text-dark mb-1">Start Code (OTP)</div>
              <div className="text-3xl font-bold text-text-dark">8291</div>
            </div>
            <div className="text-center text-sm text-text-gray">Share upon arrival</div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 flex items-center justify-center gap-2">
              <Phone size={20} />
              Call
            </button>
            <button className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              Chat
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-xl p-5 shadow-soft mb-6">
          <h2 className="text-lg font-bold text-text-dark mb-4">Service Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-text-gray" />
              <div>
                <div className="font-bold text-text-dark">Service Type</div>
                <div className="text-text-gray">Fan Repair & Installation</div>
                <div className="text-sm text-text-gray">1 Fan • Inspection Included</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-text-gray" />
              <div>
                <div className="font-bold text-text-dark">Scheduled Date</div>
                <div className="text-text-gray">Today, 14 Oct 2023</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={20} className="text-text-gray" />
              <div>
                <div className="font-bold text-text-dark">Time Slot</div>
                <div className="text-text-gray">02:00 PM - 04:00 PM</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <a href="#" className="text-yellow-primary font-bold hover:text-yellow-dark">
              Need help with this booking?
            </a>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="bg-white rounded-xl p-5 shadow-soft">
          <h2 className="text-lg font-bold text-text-dark mb-4">Tracking Order</h2>
          
          <div className="space-y-6">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {step.completed ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className={`w-6 h-6 rounded-full ${index === 2 ? 'bg-yellow-primary' : 'bg-gray-300'}`}></div>
                    )}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`absolute left-5 top-10 w-0.5 h-10 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-bold text-text-dark">{step.title}</div>
                  <div className="text-text-gray">{step.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 border-2 border-gray-300 text-text-gray font-bold rounded-xl hover:bg-gray-50">
              Reschedule Booking
            </button>
            <button className="flex-1 py-3 border-2 border-red-300 text-red-600 font-bold rounded-xl hover:bg-red-50">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <Link href="/services" className="flex flex-col items-center text-yellow-primary">
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Bookings</span>
          </Link>
          
          <Link href="/payment" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <div className="relative">
              <Wallet size={24} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                ₹
              </span>
            </div>
            <span className="text-xs mt-1 font-semibold">Wallet</span>
          </Link>
          
          <Link href="/my-bookings" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <User size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

import { Wallet } from 'lucide-react';