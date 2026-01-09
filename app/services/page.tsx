'use client';

import { ArrowLeft, Search, Bell, Star, Verified, Clock, Plus, Minus, Home, Grid3x3, ShoppingCart, User, ChevronRight, Play, X, Percent, Shield, Eye, Moon, Sun, Loader2, Pause } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ServicesPage() {
  const router = useRouter();
  const [activeService, setActiveService] = useState('Repair');
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
  const [videoProgress, setVideoProgress] = useState(0);
  
  // 🔥 API States
  const [childCategories, setChildCategories] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Video
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoUrls = [
    'https://firebasestorage.googleapis.com/v0/b/appbijiliwalaaya-user.appspot.com/o/ProductImages%2FChildMedia%2Fvideos%2Fac_b2c3%2Fspliteac_2cb6%2F4be805e3-c9ec-451d-92f5-a7c819694368.mp4?alt=media&token=fbf06e4b-441f-4765-ab68-a5735de88253',
    'https://firebasestorage.googleapis.com/v0/b/appbijiliwalaaya-user.appspot.com/o/ProductImages%2FChildMedia%2Fvideos%2Fac_b2c3%2Fspliteac_2cb6%2F99178d76-0ca4-4b6d-a6d3-29ccb0eef20f.mp4?alt=media&token=a1a590b7-8123-44ea-ac84-08853c14417c'
  ];

  // 🔥 API CALL
 // 🔥 API CALL WITH AUTH HEADER
const fetchChildCategories = async () => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('📡 Fetching API...');
    
    // Tumhara API token yahan dalna hoga
    const API_TOKEN = 'super_secure_token'; // 🔥 YAHAN APNA TOKEN DALNA
    
    const response = await fetch('https://api.bijliwalaaya.in/api/product-listing/main/3septestmain_7168/child', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': API_TOKEN, // 🔥 AUTH HEADER ADD KIYA
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📦 API Response:', data);
    
    if (data.success && data.data) {
      let categoriesData = null;
      
      // Try to find childCategory in different locations
      if (data.data.childCategory) {
        categoriesData = data.data.childCategory;
      } else if (data.data.data?.childCategory) {
        categoriesData = data.data.data.childCategory;
      } else if (data.childCategory) {
        categoriesData = data.childCategory;
      } else {
        categoriesData = data.data;
      }
      
      console.log('🎯 Found categories data:', categoriesData);
      setChildCategories(categoriesData);
      
      // Auto-select first visible category
      if (categoriesData) {
        const visibleCategories = getVisibleCategories(categoriesData);
        if (visibleCategories.length > 0) {
          setActiveService(visibleCategories[0].name);
        }
      }
    } else {
      throw new Error(data.message || 'Invalid API response format');
    }
  } catch (err: any) {
    console.error('❌ API Error:', err.message);
    setError(err.message);
    // Use dummy data for testing
    setChildCategories({
      Installation: { name: 'Installation', Visibility: true },
      Repair: { name: 'Repair', Visibility: true },
      Services: { name: 'Services', Visibility: false }
    });
  } finally {
    setLoading(false);
  }
};

  // 🔥 VISIBILITY CHECK
  const checkVisibility = (category: any) => {
    if (!category || typeof category !== 'object') return false;
    
    // Check if category has name
    const hasName = category.name || category.Name || category.title;
    if (!hasName) return false;
    
    // Check visibility - tumhare screenshot ke according
    const visibility = 
      category.Visibility !== undefined ? category.Visibility :
      category.visibility !== undefined ? category.visibility :
      category.visible !== undefined ? category.visible :
      category.isVisible !== undefined ? category.isVisible :
      true; // Default true if not specified
    
    return visibility !== false;
  };

  // 🔥 Get visible categories from childCategories object - DYNAMIC
  const getVisibleCategories = (categories: any) => {
    if (!categories || typeof categories !== 'object') return [];
    
    const visible = [];
    
    // API ke object ki keys se check karo
    const categoryKeys = Object.keys(categories);
    
    for (const catKey of categoryKeys) {
      const category = categories[catKey];
      
      // Check if it's a valid category object
      if (category && typeof category === 'object') {
        // Check visibility
        const isVisible = checkVisibility(category);
        
        if (isVisible) {
          visible.push({
            key: catKey,
            name: category.name || catKey,
            ...category
          });
        }
      }
    }
    
    console.log('👀 Visible categories:', visible);
    return visible;
  };

  // Get current visible categories
  const visibleCategories = childCategories ? getVisibleCategories(childCategories) : [];
  
  // Get services for active category
  const getServicesForActiveCategory = () => {
    if (!activeService || !childCategories) return [];
    
    const activeCat = childCategories[activeService];
    if (!activeCat) return [];
    
    // Default services if none in API
    const defaultServices = [
      {
        id: 1,
        title: 'Advanced Foam Jet Service',
        rating: 4.8,
        warranty: '45 Days Warranty',
        features: ['Deep cleaning of filters & coils', '45-60 mins service time'],
        price: 599,
        originalPrice: 799,
        discount: '25% OFF',
        specialOffer: 167,
        tag: 'BESTSELLER',
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
      },
      {
        id: 3,
        title: 'Anti-Rust Coating',
        rating: 4.9,
        warranty: '1 Year Warranty',
        features: ['Protects outdoor unit from rust', 'Increases lifespan'],
        price: 299,
      },
      {
        id: 4,
        title: 'AC Repair & Visit',
        rating: 4.7,
        warranty: '30 Days Warranty',
        features: ['Technician visit charge', 'Adjusted in final bill'],
        price: 199,
      },
    ];

    // Customize based on active service
    return defaultServices.map(service => ({
      ...service,
      title: `${activeService} ${service.title.split(' ').slice(1).join(' ')}`,
      categoryType: activeService,
    }));
  };

  const services = getServicesForActiveCategory();

  // Scroll listener
  useEffect(() => {
    fetchChildCategories();
    
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
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

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Video controls
  const playNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length);
  };

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };
  
  // Calculate totals
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = services.reduce((sum, service) => 
    sum + (service.price * (quantities[service.id] || 0)), 0);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearch(false);
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // Status bar color
  const getStatusBarColor = () => {
    if (scrollProgress < 25) return 'bg-gray-900';
    if (scrollProgress < 50) return 'bg-yellow-900';
    if (scrollProgress < 75) return 'bg-yellow-700';
    return 'bg-yellow-500';
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle category click
  const handleCategoryClick = (categoryName: string) => {
    if (visibleCategories.some(cat => cat.name === categoryName)) {
      setActiveService(categoryName);
    }
  };

  // Get image background based on category
  const getImageBg = (id: number) => {
    const backgrounds = [
      'from-blue-300 to-blue-500',
      'from-green-300 to-green-500',
      'from-yellow-300 to-yellow-500',
      'from-gray-300 to-gray-500'
    ];
    return backgrounds[(id - 1) % backgrounds.length];
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} pb-24 transition-colors duration-300`}>
      {/* Dark/Light Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
          darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Search Modal */}
      {showSearch && (
        <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className={`sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3`}>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSearch(false)} className="p-1">
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
                    placeholder="Search for services..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                    }`}
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
              <span className={`text-lg font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                AC Repair
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSearch(true)}
              className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <Search size={22} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <button className={`p-1.5 relative rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Bell size={22} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Video Section */}
      <div className="relative w-full aspect-[16/10] bg-black video-section overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrls[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video.duration) {
              setVideoProgress(video.currentTime / video.duration);
            }
          }}
          onEnded={playNextVideo}
        >
          Your browser does not support the video tag.
        </video>

        {/* Debug Info */}
        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <Loader2 className="animate-spin text-white mx-auto" size={32} />
              <p className="text-white mt-2 text-sm">Loading categories...</p>
            </div>
          </div>
        )}

        {/* Video Progress */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-white text-xs font-bold">
              <span className="text-yellow-400">{activeService}</span>
            </div>
            <div className="text-white/70 text-xs">
              {services.length} services
            </div>
          </div>
          <div className="w-full h-4 bg-gray-600/60 rounded-full overflow-hidden shadow-xl">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${((currentVideoIndex + videoProgress) / videoUrls.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

     

      {/* Banner */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className={`bg-gradient-to-br ${
            scrollProgress > 30 ? 'from-blue-700 to-blue-900' : 'from-blue-600 to-blue-800'
          } rounded-2xl p-4 text-white`}>
            <div className="text-[10px] font-medium text-blue-100 mb-1">HDFC Offer</div>
            <p className="font-extrabold text-2xl">15% OFF</p>
            <p className="text-[10px] opacity-90 mt-0.5">Instant cashback on cards</p>
          </div>
          <div className={`bg-gradient-to-br ${
            scrollProgress > 30 ? 'from-green-700 to-green-900' : 'from-green-600 to-green-800'
          } rounded-2xl p-4 text-white`}>
            <div className="text-[10px] font-medium text-green-100 mb-1">New User</div>
            <p className="font-extrabold text-2xl">FLAT ₹100</p>
            <p className="text-[10px] opacity-90 mt-0.5">Use Code: FIRST100</p>
          </div>
        </div>
      </div>

      {/* 🔥 DYNAMIC SERVICE TYPE TABS FROM API */}
      {!isScrolled && visibleCategories.length > 0 && (
        <div className="mt-6 px-4">
          <div className={`${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm py-3 px-3 rounded-xl border shadow-sm`}>
            <div className={`grid gap-2 ${visibleCategories.length === 1 ? 'grid-cols-1' : visibleCategories.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {visibleCategories.map((category: any) => (
                <button
                  key={category.key || category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-2 py-2.5 rounded-lg text-xs font-medium text-center truncate transition-all duration-200 ${
                    activeService === category.name
                      ? `bg-gradient-to-r ${
                          scrollProgress > 50 ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500'
                        } text-gray-900 font-bold shadow-md`
                      : `${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500 hover:bg-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100'} border shadow-sm`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      {isScrolled && visibleCategories.length > 0 && (
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
                    placeholder={`Search ${activeService}...`}
                    className={`w-full pl-10 pr-4 py-2 ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                    } border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm`}
                  />
                </div>
              </form>
              <button className={`flex items-center gap-1.5 ${
                scrollProgress > 50 ? 'bg-yellow-500' : 'bg-yellow-400'
              } text-gray-900 px-3 py-1.5 rounded-lg text-xs font-bold`}>
                <span>{services.length}</span>
                <span>Services</span>
              </button>
            </div>
            <div className={`grid gap-2 ${visibleCategories.length === 1 ? 'grid-cols-1' : visibleCategories.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {visibleCategories.map((category: any) => (
                <button
                  key={category.key || category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-2 py-2.5 rounded-lg text-xs font-medium text-center truncate ${
                    activeService === category.name
                      ? `bg-gradient-to-r ${
                          scrollProgress > 50 ? 'from-yellow-500 to-yellow-600' : 'from-yellow-400 to-yellow-500'
                        } text-gray-900 font-bold shadow-md`
                      : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'} border shadow-sm`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommended Services Section */}
      <section className="px-4 pb-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {/* {loading ? 'Loading...' : `${activeService} (${services.length})`} */}
          </h2>
          <button 
            onClick={fetchChildCategories}
            className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
          >
            Refresh
            <span className="text-lg">🔄</span>
          </button>
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
                  <div className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative ${getImageBg(service.id)}`}>
                    <div className={`w-full h-full bg-gradient-to-br ${getImageBg(service.id)}`} />

                    {service.tag && (
                      <div
                        className={`absolute top-0 left-0 transition-all duration-500 ${
                          scrollProgress > 30 ? 'bg-yellow-500' : 'bg-yellow-400'
                        } text-gray-900 text-[9px] font-bold px-2 py-1 rounded-br-lg`}
                      >
                        {service.tag}
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3" />
                  </div>

                  <Link
                    href={`/service-details/${service.id}`}
                    className="mt-2 mr-2 flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    <Eye size={14} />
                    <span>View Details</span>
                  </Link>
                  
                  <div className="mt-3 ml-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{service.price}
                      </span>

                      {service.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{service.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {service.originalPrice && (
                      <div className="mt-2 inline-flex items-center rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                        Save ₹{service.originalPrice - service.price}
                      </div>
                    )}
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
                    
                    {service.features && (
                      <ul className={`text-[11px] space-y-1 mb-4 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {service.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span
                              className={`w-1 h-1 rounded-full ${
                                darkMode ? 'bg-gray-600' : 'bg-gray-400'
                              }`}
                            ></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Buttons */}
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