"use client";

import { Home, Grid3x3, ShoppingCart, User, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Services', icon: Grid3x3, href: '/services' },
    { name: 'Cart', icon: ShoppingCart, href: '/my-bookings' },
    { name: 'Profile', icon: User, href: '/profile' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard z-50">
      <div className="flex justify-around items-center relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center transition-colors ${
                active ? 'text-yellow-primary' : 'text-text-gray hover:text-yellow-primary'
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {item.name === 'Cart' && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-primary text-text-dark text-xs rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-semibold">{item.name}</span>
            </Link>
          );
        })}

        {/* Floating Search Button */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
          <Link href="/">
            <button className="w-16 h-16 bg-yellow-primary rounded-full flex items-center justify-center shadow-hard hover:bg-yellow-dark transition-colors">
              <Search size={28} className="text-text-dark" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}