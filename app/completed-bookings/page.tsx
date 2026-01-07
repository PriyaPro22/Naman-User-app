"use client";

import { ArrowLeft, CheckCircle, Star, Calendar, Clock, Home, Grid3x3, ShoppingCart, User, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CompletedBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Completed');

  const tabs = ['Active', 'Completed', 'Cancelled'];

  const completedBookings = [
    {
      id: 'BW-9021',
      service: 'AC Cooling Check',
      date: 'Today, 10:30 AM',
      technician: 'Rajesh Kumar',
      rating: 4.8,
      amount: '₹499',
      status: 'Completed',
      invoice: true
    },
    {
      id: 'BW-8832',
      service: 'Switchboard Repair',
      date: 'Aug 24, 2:00 PM',
      amount: '₹25.00',
      status: 'Completed successfully',
      invoice: false
    },
    {
      id: 'BW-7102',
      service: 'Kitchen Sink Unclog',
      date: 'Jul 12, 11:15 AM',
      amount: '₹40.00',
      status: 'Completed successfully',
      invoice: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">Completed Bookings</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-sm font-medium ${
              activeTab === tab
                ? 'text-yellow-primary border-b-2 border-yellow-primary'
                : 'text-text-gray hover:text-text-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 mt-4">
        {completedBookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-xl p-5 shadow-soft mb-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-text-dark">{booking.service}</h3>
                <div className="text-sm text-text-gray">Booking #{booking.id} • {booking.date}</div>
              </div>
              {booking.amount && (
                <div className="text-2xl font-bold text-text-dark">{booking.amount}</div>
              )}
            </div>

            {/* Technician Info */}
            {booking.technician && (
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-card rounded-full flex items-center justify-center">
                  <User size={20} className="text-text-gray" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-text-dark">{booking.technician}</div>
                  <div className="text-sm text-text-gray">Technician • Job Done</div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{booking.rating}</span>
                </div>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span className="font-bold text-green-600">{booking.status}</span>
              </div>
              
              <div className="flex gap-2">
                {booking.invoice && (
                  <button className="px-3 py-1.5 border border-gray-300 text-text-gray text-sm font-medium rounded-lg hover:bg-gray-50 flex items-center gap-1">
                    <Download size={16} />
                    Invoice
                  </button>
                )}
                <Link href="/feedback">
                  <button className="px-3 py-1.5 bg-yellow-primary text-text-dark text-sm font-bold rounded-lg hover:bg-yellow-dark flex items-center gap-1">
                    <Star size={16} />
                    Rate Service
                  </button>
                </Link>
              </div>
            </div>

            {/* Details Button */}
            <button className="w-full py-2.5 border border-gray-300 text-text-dark font-medium rounded-lg hover:bg-gray-50">
              View Details
            </button>

            {/* Share Option */}
            <button className="w-full mt-3 py-2 text-yellow-primary font-bold hover:text-yellow-dark flex items-center justify-center gap-1">
              <Share2 size={16} />
              Share Booking Details
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
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