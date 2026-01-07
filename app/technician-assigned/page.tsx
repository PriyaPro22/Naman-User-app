"use client";

import { ArrowLeft, Phone, MessageCircle, Navigation, Clock, MapPin, Home, Grid3x3, ShoppingCart, User, Star, Car } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TechnicianAssignedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">My Bookings</span>
          </button>
        </div>
      </header>

      <div className="px-4 mt-4">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 text-white mb-6">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-100 mb-1">NAVIGATING</div>
            <div className="text-2xl font-bold mb-2">Technician is on the way</div>
            <div className="text-lg">Estimated arrival in 15 minutes</div>
          </div>
        </div>

        {/* Technician Card */}
        <div className="bg-white rounded-xl p-5 shadow-soft mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-card rounded-full flex items-center justify-center">
                <User size={28} className="text-text-gray" />
              </div>
              <div>
                <div className="font-bold text-text-dark text-lg">Rajesh Kumar</div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-text-dark font-bold">4.8</span>
                  <span className="text-text-gray">(124)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-text-gray" />
                <div>
                  <div className="font-bold text-text-dark">15 min</div>
                  <div className="text-sm text-text-gray">ETA • 5 KM</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Car size={20} className="text-blue-icon" />
                <div className="text-sm text-text-gray">On the way</div>
              </div>
            </div>
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

        {/* Booking Details */}
        <div className="bg-white rounded-xl p-5 shadow-soft">
          <h2 className="text-lg font-bold text-text-dark mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-text-dark">AC Repair & Service</div>
                <div className="text-sm text-text-gray">#BWA-9283</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-gray">Split AC • General Service</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-text-gray" />
              <div className="text-text-gray">123 Main Street, New York</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-text-gray" />
                <span className="text-text-dark font-bold">Oct 24</span>
                <span className="text-text-gray">•</span>
                <Clock size={20} className="text-text-gray" />
                <span className="text-text-dark font-bold">02:00 PM</span>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                Paid
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link href="/feedback">
              <button className="w-full bg-yellow-primary text-text-dark font-bold py-3 rounded-xl hover:bg-yellow-dark shadow-md">
                Track Live Location
              </button>
            </Link>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <Link href="/my-bookings" className="flex flex-col items-center text-yellow-primary">
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Bookings</span>
          </Link>
          
          <Link href="/payment" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1 font-semibold">Cart</span>
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

import { Calendar } from 'lucide-react';