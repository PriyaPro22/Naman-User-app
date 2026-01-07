"use client";

import { CheckCircle, Calendar, User, Home, Grid3x3, ShoppingCart, User as UserIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">Success</span>
          </button>
        </div>
      </header>

      <div className="px-4 mt-8 flex flex-col items-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-text-dark mb-2">Payment Successful!</h1>
        <p className="text-text-gray text-center mb-8">
          Your repair expert has been successfully booked. You will receive a confirmation SMS shortly.
        </p>

        <div className="bg-white rounded-xl p-5 shadow-soft w-full max-w-md">
          <h2 className="text-lg font-bold text-text-dark mb-4">SERVICE TYPE</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-gray">AC Repair & Service</span>
              <span className="font-bold">#BWA-8829</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-gray">Amount Paid</span>
              <span className="text-2xl font-bold">$499.00</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-text-gray" />
              <div>
                <div className="font-bold">Scheduled Date & Time</div>
                <div className="text-text-gray">Oct 24, 2023 • 10:00 AM</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <User size={20} className="text-text-gray" />
              <div>
                <div className="font-bold">Technician Assigned</div>
                <div className="text-text-gray">Rajesh Kumar will arrive on time.</div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link href="/my-bookings" className="flex-1">
              <button className="w-full py-3 border-2 border-yellow-primary text-yellow-primary font-bold rounded-xl hover:bg-yellow-50">
                View My Bookings
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 bg-yellow-primary text-text-dark font-bold rounded-xl hover:bg-yellow-dark shadow-md">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-yellow-primary">
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
            <UserIcon size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}