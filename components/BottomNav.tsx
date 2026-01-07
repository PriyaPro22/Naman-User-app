'use client'

import { Home, ShoppingBag, Calendar, User, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShoppingBag, label: 'Services', href: '/services' },
    { icon: Package, label: 'Shopping', href: '/shopping' },
    { icon: Calendar, label: 'Bookings', href: '/bookings' },
    { icon: User, label: 'Profile', href: '/profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-yellow-100 md:hidden z-30">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center p-2 ${isActive ? 'text-yellow-600' : 'text-gray-500'}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}