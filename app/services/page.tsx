
'use client';

import { ArrowLeft, Search, Bell, Star, Verified, Clock, Plus, Minus, Home, Grid3x3, ShoppingCart, User, ChevronRight, Play, X, Percent, Shield, Eye, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ServicesPage() {
  const router = useRouter();
  const [activeService, setActiveService] = useState('Repair Service');
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 1,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Scroll listener for sticky header और progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Calculate scroll progress for status bar
      const videoSection = document.querySelector('.video-section');
      if (videoSection) {
        const videoHeight = videoSection.clientHeight;
        const scrollY = window.scrollY;
        const progress = Math.min((scrollY / videoHeight) * 100, 100);
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const services = [
   {
    id: 1,
    title: 'Advanced Foam Jet Service',
    rating: 4.8,
    warranty: '45 Days Warranty',
    features: ['Deep cleaning of filters & coils', '45-60 mins service time'],
    price: 180, // Current price
    originalPrice: 536, // Crossed out price
    discount: '66% OFF', // Discount text
    specialOffer: 167, // Special offer price
    tag: 'BESTSELLER',
    imageBg: 'from-blue-300 to-blue-500',
  },
    {
      id: 2,
      title: 'Power Jet Service (Basic)',
      rating: 4.5,
      warranty: '30 Days Warranty',
      features: ['High pressure water cleaning', '30-45 mins'],
      price: 399,
      originalPrice: 499,
      discount: '20% OFF',
      imageBg: 'from-green-300 to-green-500',
    },
    {
      id: 3,
      title: 'Anti-Rust Coating',
      rating: 4.9,
      warranty: '1 Year Warranty',
      description: 'Protects outdoor unit from rust & corrosion, increases lifespan.',
      price: 299,
      imageBg: 'from-yellow-300 to-yellow-500',
    },
    {
      id: 4,
      title: 'AC Repair & Visit',
      rating: 4.7,
      warranty: '30 Days Warranty',
      description: 'Technician visit charge. Adjusted in final bill if repair is done.',
      price: 199,
      imageBg: 'from-gray-300 to-gray-500',
    },
  ];

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  }
  
  // Image के according service types
  const serviceTypes = ['Repair Service', 'Installation', 'View All'];

  // Calculate total items and price for cart
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = services.reduce((sum, service) => sum + (service.price * (quantities[service.id] || 0)), 0);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearch(false);
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // Status bar color based on scroll progress
  const getStatusBarColor = () => {
    if (scrollProgress < 25) return 'bg-gray-900';
    if (scrollProgress < 50) return 'bg-yellow-900';
    if (scrollProgress < 75) return 'bg-yellow-700';
    return 'bg-yellow-500';
  };

  // Handle view details click
  const handleViewDetails = (serviceId: number) => {
    console.log('Viewing details for service:', serviceId);
    router.push(`/service-details/${serviceId}`);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} pb-24 transition-colors duration-300`}>
      {/* Dark/Light Mode Toggle Button - CHOTI KAR DIYA */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          darkMode 
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Search Modal */}
      {showSearch && (
        <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowSearch(false)}
                className="p-1"
              >
                <ArrowLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
              </button>
              
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for services, products..."
                    className={`w-full pl-10 pr-4 py-3 ${
                      darkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-0'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X size={20} className="text-gray-400" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h3 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {['AC Repair', 'Fan Service', 'Fridge Repair', 'TV Installation'].map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className={`px-3 py-2 text-sm rounded-lg hover:opacity-90 ${
                      darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Popular Services</h3>
              <div className="space-y-2">
                {[
                  { name: 'AC Service & Repair', icon: '❄️' },
                  { name: 'Refrigerator Repair', icon: '🧊' },
                  { name: 'Washing Machine Service', icon: '🧺' },
                  { name: 'TV Installation', icon: '📺' },
                  { name: 'Electrician Services', icon: '⚡' },
                ].map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(service.name);
                      handleSearch({ preventDefault: () => {} } as React.FormEvent);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{service.icon}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{service.name}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Book now starting from ₹299</p>
                    </div>
                    <ChevronRight size={18} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'} ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b px-4 py-4 shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft size={24} className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
              <span className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>AC Repair</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSearch(true)}
              className={`p-1.5 rounded-full transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <Search size={22} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <button className={`p-1.5 relative rounded-full transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <Bell size={22} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Video Section with Status Bar Inside - STATUS BAR FULL WIDTH KIYA */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-r from-gray-900 to-gray-800 video-section">
        {/* Status Bar - Video section ke FULL width में और top पर */}
        <div className={`absolute top-0 left-0 right-0 z-10 ${getStatusBarColor()} transition-all duration-500`}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left: AC Repair */}
              <div className="flex items-center gap-2">
                <div className="text-white">
                 
                </div>
              </div>
              
              {/* Center: Progress Percentage */}
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full w-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
               
              </div>
              {/* Right: Rating */}
              
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Video Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-500 ${
            scrollProgress > 50 ? 'bg-yellow-400 text-gray-900' : 'bg-yellow-400/80 text-gray-900'
          } text-[10px] font-bold mb-2`}>
            <Shield size={12} />
            <span>45 Days Service Warranty</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-white text-xs font-bold">
              4.5<span className="text-yellow-400">★</span>
            </div>
            <div className="text-white/80 text-xs">
              {scrollProgress > 70 ? '🔥 Hot Service' : '🌟 Top Rated'}
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className={`bg-gradient-to-br transition-all duration-500 ${
            scrollProgress > 30 ? 'from-blue-700 to-blue-900' : 'from-blue-600 to-blue-800'
          } rounded-2xl p-4 text-white`}>
            <div className="text-[10px] font-medium text-blue-100 mb-1">HDFC Offer</div>
            <p className="font-extrabold text-2xl">15% OFF</p>
            <p className="text-[10px] opacity-90 mt-0.5">Instant cashback on cards</p>
          </div>
          <div className={`bg-gradient-to-br transition-all duration-500 ${
            scrollProgress > 30 ? 'from-green-700 to-green-900' : 'from-green-600 to-green-800'
          } rounded-2xl p-4 text-white`}>
            <div className="text-[10px] font-medium text-green-100 mb-1">New User</div>
            <p className="font-extrabold text-2xl">FLAT ₹100</p>
            <p className="text-[10px] opacity-90 mt-0.5">Use Code: FIRST100</p>
          </div>
        </div>
      </div>

      {/* Static Service Type Tabs */}
      {!isScrolled && (
        <div className="mt-6 px-4">
          <div className={`${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm py-3 px-3 rounded-xl border shadow-sm`}>
            <div className="grid grid-cols-3 gap-2">
              {serviceTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveService(type)}
                  className={`px-2 py-2.5 rounded-lg text-xs font-medium text-center truncate transition-all duration-200 ${
                    activeService === type
                      ? `bg-gradient-to-r ${
                          scrollProgress > 50 ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500'
                        } text-gray-900 font-bold shadow-md`
                      : `${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500 hover:bg-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100'} border shadow-sm`
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header - Scroll होने पर दिखेगा */}
      {isScrolled && (
        <div className={`fixed top-0 left-0 right-0 z-50 ${
          darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'
        } backdrop-blur-md shadow-lg border-b`}>
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => router.back()} className={`p-1 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <ArrowLeft size={22} className={darkMode ? 'text-gray-300' : 'text-gray-700'} />
              </button>
              
              <form onSubmit={handleSearch} className="flex-1 mx-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search AC services..."
                    className={`w-full pl-10 pr-4 py-2 ${
                      darkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                    } border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm`}
                  />
                </div>
              </form>
              
              <button className={`flex items-center gap-1.5 transition-all duration-500 ${
                scrollProgress > 50 ? 'bg-yellow-500' : 'bg-yellow-400'
              } text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 shadow-md`}>
                <Star size={14} fill="currentColor" />
                <span>4.75</span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {serviceTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveService(type)}
                  className={`px-2 py-2.5 rounded-lg text-xs font-medium text-center truncate transition-all duration-200 ${
                    activeService === type
                      ? `bg-gradient-to-r ${
                          scrollProgress > 50 ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500'
                        } text-gray-900 font-bold shadow-md`
                      : `${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500 hover:bg-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100'} border shadow-sm`
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommended Repairs Section */}
      <section className="px-4 pb-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Recommended Repairs</h2>
          <Link 
            href="/all-services" 
            className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
          >
            View All
            <ChevronRight size={12} />
          </Link>
        </div>

       <div className="space-y-4">
  {services.map(service => (
    <div key={service.id} className={`rounded-2xl p-4 shadow-sm border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/50' 
        : 'bg-white border-gray-100 hover:shadow-md'
    } transition-shadow duration-300`}>
      <div className="flex gap-4">
        {/* Image Section */}
        <div className="w-[120px] flex-shrink-0">
          {/* Image Box */}
          <div className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative ${service.imageBg}`}>
            <div className={`w-full h-full bg-gradient-to-br ${service.imageBg}`} />

            {service.tag && (
              <div
                className={`absolute top-0 left-0 transition-all duration-500 ${
                  scrollProgress > 30 ? 'bg-yellow-500' : 'bg-yellow-400'
                } text-gray-900 text-[9px] font-bold px-2 py-1 rounded-br-lg`}
              >
                {service.tag}
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3" />
          </div>

          {/* 🔹 View All button (image ke just niche) */}
          <Link
            href={`/service-details/${service.id}`}
            className="mt-2 mr-2 flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
          >
            <Eye size={14} />
            <span>View Details</span>
          </Link>
   <div className="mt-3 ml-4">
  {/* Price row */}
  <div className="flex items-baseline gap-2">
    <span className="text-lg font-bold text-gray-900">
      ₹599
    </span>

    <span className="text-sm text-gray-400 line-through">
      ₹400
    </span>
    
  </div>
  {/* Save badge */}
  <div className="mt-2 inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
    Save ₹255
  </div>
</div>
     <div className="mt-1 text-xs font-medium text-[#2C4C9C] dark:text-[#2C4C9C]">
  Inclusive of all taxes
</div>


        </div>
        
        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className={`font-bold text-base mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              {service.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className={`flex items-center gap-1 text-[11px] font-bold transition-all duration-500 ${
                scrollProgress > 40 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-green-50 text-green-700'
              } px-1.5 py-0.5 rounded`}>
                <Star size={12} fill="currentColor" />
                {service.rating}
              </div>
              <div className={`text-[10px] font-medium ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              } px-1.5 py-0.5 rounded flex items-center gap-1`}>
                <Verified size={10} className="text-yellow-400" />
                {service.warranty}
              </div>
            </div>
            
            {/* Description/Features */}
            {service.features ? (
              <ul className={`text-[11px] space-y-1 mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className={`w-1 h-1 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-400'
                    }`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-[11px] mb-4 leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {service.description}
              </p>
            )}
          </div>

          {/* Action Buttons - FIXED TO RIGHT SIDE */}
          <div className="flex justify-end mt-4">
            {quantities[service.id] > 0 ? (
              <div className={`flex items-center rounded-lg overflow-hidden border shadow-sm ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}>
                <button 
                  onClick={() => updateQuantity(service.id, -1)}
                  className={`w-8 h-8 flex items-center justify-center ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Minus size={14} />
                </button>
                <span className={`text-sm font-bold w-6 text-center ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {quantities[service.id]}
                </span>
                <button 
                  onClick={() => updateQuantity(service.id, 1)}
                  className={`w-8 h-8 flex items-center justify-center ${
                    darkMode 
                      ? 'text-blue-400 hover:bg-gray-600' 
                      : 'text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => updateQuantity(service.id, 1)}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 ${
                  scrollProgress > 20
                    ? 'bg-blue-700 hover:bg-blue-800'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold text-sm shadow-md hover:shadow-lg min-w-[80px]`}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </section>

      {/* Fixed Cart Banner */}
      {totalItems > 0 && (
        <Link href="/payment">
          <div className="fixed bottom-20 left-4 right-4 z-40">
            <div className={`bg-gray-900 rounded-2xl p-3 text-white shadow-hard transition-all duration-500 ${
              scrollProgress > 60 ? 'shadow-2xl' : ''
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className={`w-8 h-8 transition-all duration-500 ${
                      scrollProgress > 40 ? 'bg-yellow-500' : 'bg-yellow-400'
                    } rounded-full flex items-center justify-center`}>
                      <span className="text-xs font-bold text-gray-900">1</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">+{totalItems - 1}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-bold">{totalItems} Items added</span>
                    <p className="text-xs text-gray-300">₹{totalPrice} total</p>
                  </div>
                </div>
                <button className={`flex items-center gap-1 transition-all duration-500 ${
                  scrollProgress > 40 ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-white text-gray-900 hover:bg-gray-100'
                } px-3 py-1.5 rounded-lg text-sm font-bold`}>
                  View Cart
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 py-3 shadow-hard z-50 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="flex justify-around items-center">
          <Link href="/" className={`flex flex-col items-center ${
            darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
          }`}>
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <button className={`flex flex-col items-center ${
            scrollProgress > 70 ? 'text-yellow-500' : darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Services</span>
          </button>
          
          <Link href="/payment" className={`flex flex-col items-center relative ${
            darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
          }`}>
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 transition-all duration-500 ${
                scrollProgress > 50 ? 'bg-yellow-500' : 'bg-red-500'
              } text-white text-xs rounded-full flex items-center justify-center`}>
                {totalItems}
              </span>
            )}
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          
          <Link href="/my-bookings" className={`flex flex-col items-center ${
            darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
          }`}>
            <User size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}