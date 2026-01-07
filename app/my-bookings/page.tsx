"use client";

import { useState } from 'react';
import { ArrowLeft, Search, Clock, User, Home, Grid3x3, ShoppingCart, User as UserIcon, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Active');

  const tabs = ['Active', 'History', 'Disputes'];

  const activeBookings = [
    {
      id: 'BW-9021',
      service: 'AC Repair & Service',
      time: 'Today, 02:00 PM - 04:00 PM',
      status: 'Searching for technician...',
      statusDesc: 'Notifying experts near you',
      type: 'NEW LEAD'
    },
    {
      id: 'BW-8842',
      service: 'Home Deep Cleaning',
      time: 'Tomorrow, 10:00 AM',
      status: 'Scheduled',
      type: 'SCHEDULED'
    }
  ];

  const disputes = [
    {
      id: 'BWA-9821',
      service: 'AC Repair & Servicing',
      date: 'Completed: Oct 24, 2023',
      status: 'Issue Under Review',
      type: 'WARRANTY CLAIM'
    }
  ];

  const history = [
    {
      id: 'BW-9021',
      service: 'AC Cooling Check',
      date: 'Today, 10:30 AM',
      technician: 'Rajesh Kumar',
      amount: '₹499',
      status: 'Completed'
    },
    {
      id: 'BW-8832',
      service: 'Switchboard Repair',
      date: 'Aug 24, 2:00 PM',
      amount: '₹25.00',
      status: 'Completed successfully'
    },
    {
      id: 'BW-7102',
      service: 'Kitchen Sink Unclog',
      date: 'Jul 12, 11:15 AM',
      amount: '₹40.00',
      status: 'Completed successfully'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">My Bookings</span>
          </button>
          <Search size={20} className="text-text-gray" />
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
        {activeTab === 'Active' && (
          <div className="space-y-4">
            {activeBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl p-4 shadow-soft">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-yellow-primary">{booking.type}</span>
                    <h3 className="text-lg font-bold text-text-dark">#{booking.id}</h3>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="font-bold text-text-dark">{booking.service}</div>
                  <div className="text-sm text-text-gray flex items-center gap-2 mt-1">
                    <Clock size={14} />
                    {booking.time}
                  </div>
                </div>
                
                {booking.status === 'Searching for technician...' ? (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-bold text-blue-800">{booking.status}</div>
                    <div className="text-sm text-blue-600">{booking.statusDesc}</div>
                  </div>
                ) : (
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="font-bold text-text-dark">{booking.status}</div>
                  </div>
                )}
                
                <Link href="/booking-status">
                  <button className="w-full py-2 mt-3 border border-gray-300 text-text-dark font-bold rounded-lg hover:bg-gray-50">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Disputes' && (
          <div className="space-y-4">
            {disputes.map(dispute => (
              <div key={dispute.id} className="bg-white rounded-xl p-4 shadow-soft">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-bold text-red-600">{dispute.type}</span>
                    <h3 className="text-lg font-bold text-text-dark">{dispute.service}</h3>
                    <div className="text-sm text-text-gray">Booking ID: #{dispute.id}</div>
                    <div className="text-sm text-text-gray">{dispute.date}</div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <div className="font-bold text-text-dark mb-2">CLAIM STATUS</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-sm">Claim Submitted • Oct 25, 10:30 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-yellow-500" />
                      <span className="text-sm">Under Review • Our team is reviewing the technician report</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-yellow-primary text-text-dark font-bold rounded-xl hover:bg-yellow-dark shadow-md">
                  View Claim Details
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'History' && (
          <div className="space-y-4">
            {history.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-soft">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-text-dark">{item.service}</h3>
                    <div className="text-sm text-text-gray">Booking #{item.id} • {item.date}</div>
                  </div>
                  {item.amount && (
                    <div className="text-lg font-bold text-text-dark">{item.amount}</div>
                  )}
                </div>
                
                {item.technician && (
                  <div className="flex items-center gap-2 mb-3">
                    <User size={16} className="text-text-gray" />
                    <span className="text-sm text-text-gray">{item.technician} • Job Done</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm text-green-600">{item.status}</span>
                  </div>
                  <Link href="/completed-bookings">
                    <button className="text-yellow-primary text-sm font-bold hover:text-yellow-dark">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
          
          <button className="flex flex-col items-center text-yellow-primary">
            <UserIcon size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}