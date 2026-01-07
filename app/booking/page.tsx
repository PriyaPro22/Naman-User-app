"use client";

import { ArrowLeft, Calendar, Clock, MapPin, Home, Grid3x3, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">Booking</span>
          </button>
        </div>
      </header>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-5 shadow-soft">
          <h2 className="text-xl font-bold text-text-dark mb-4">AC Repair - Standard</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-gray mb-2">Select Date</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg">
                <Calendar size={20} className="text-text-gray" />
                <span className="text-text-dark">Today, Oct 24</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-gray mb-2">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2">
                {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'].map(time => (
                  <button key={time} className="p-3 border border-gray-300 rounded-lg text-center hover:border-yellow-primary">
                    {time}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-gray mb-2">Address</label>
              <div className="flex items-start gap-2 p-3 border border-gray-300 rounded-lg">
                <MapPin size={20} className="text-text-gray mt-1" />
                <span className="text-text-dark">123 Main Street, New York, USA</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-gray">Service Cost</span>
              <span className="font-bold">₹499</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-gray">Discount</span>
              <span className="text-green-600 font-bold">-₹151</span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold">₹348</span>
            </div>
          </div>

          <Link href="/payment">
            <button className="w-full bg-yellow-primary text-text-dark font-bold py-3 rounded-xl hover:bg-yellow-dark shadow-md mt-6">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <Link href="/services" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Services</span>
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