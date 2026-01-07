"use client";

import { ArrowLeft, Wind, Tv, Refrigerator, Microwave, Droplets, Flame } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CategoryPage() {
  const router = useRouter();

  const categories = [
    { name: 'Split AC', icon: '🔧', color: 'bg-blue-50' },
    { name: 'Window AC', icon: '🪟', color: 'bg-blue-50' },
    { name: 'Tower AC', icon: '🏢', color: 'bg-blue-50' },
    { name: 'Cassette AC', icon: '📦', color: 'bg-blue-50' },
    { name: 'Portable AC', icon: '🎒', color: 'bg-blue-50' },
    { name: 'Other Types', icon: '⋯', color: 'bg-blue-50' },
  ];

  const homeAppliances = [
    { name: 'AC Cooling', icon: <Wind size={24} className="text-blue-icon" />, color: 'bg-blue-50' },
    { name: 'Washing Machine', icon: '🧺', color: 'bg-purple-50' },
    { name: 'Refrigerator Issue', icon: <Refrigerator size={24} className="text-blue-icon" />, color: 'bg-green-50' },
    { name: 'Microwave Oven', icon: <Microwave size={24} className="text-blue-icon" />, color: 'bg-red-50' },
    { name: 'Water Purifier', icon: <Droplets size={24} className="text-blue-icon" />, color: 'bg-cyan-50' },
    { name: 'TV Repair', icon: <Tv size={24} className="text-blue-icon" />, color: 'bg-pink-50' },
    { name: 'Geyser Service', icon: <Flame size={24} className="text-blue-icon" />, color: 'bg-orange-50' },
    { name: 'Kitchen Chimney', icon: '💨', color: 'bg-gray-card' },
  ];

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <button onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft size={24} />
          <span className="text-lg font-bold text-text-dark">Home Appliances</span>
        </button>
      </header>

      <div className="px-4 mt-4 mb-6">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-hard">
          <h2 className="text-xl font-bold mb-2">Get 20% off on your first AC Service</h2>
          <Link href="/booking">
            <button className="w-full bg-yellow-primary text-text-dark font-bold py-3 rounded-xl hover:bg-yellow-dark shadow-md mt-3">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      <section className="px-4 mb-8">
        <h2 className="text-xl font-bold text-text-dark mb-5">AC SERVICE - Select Your Category</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <Link key={index} href="/services">
              <div className={`${cat.color} rounded-xl p-4 flex flex-col items-center shadow-soft hover:shadow-medium`}>
                <span className="text-2xl mb-2">{cat.icon}</span>
                <span className="text-sm font-medium text-center">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4">
        <h2 className="text-xl font-bold text-text-dark mb-5">Home Appliances</h2>
        <div className="grid grid-cols-2 gap-4">
          {homeAppliances.map((appliance, index) => (
            <Link key={index} href="/services">
              <div className="bg-white rounded-xl p-4 shadow-soft hover:shadow-medium">
                <div className={`w-12 h-12 ${appliance.color} rounded-full flex items-center justify-center mb-3`}>
                  {typeof appliance.icon === 'string' ? (
                    <span className="text-xl">{appliance.icon}</span>
                  ) : (
                    appliance.icon
                  )}
                </div>
                <span className="text-sm font-medium text-text-dark">{appliance.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <button className="flex flex-col items-center text-yellow-primary">
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Services</span>
          </button>
          
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

import { Home, Grid3x3, ShoppingCart, User } from 'lucide-react';