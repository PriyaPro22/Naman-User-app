

"use client";


import { useState, useEffect } from 'react';
import { 
  Search, MapPin, Bell, Bike, 
  Wrench, Fan, Tv, Refrigerator, Smartphone, Laptop,
  ChevronRight, Loader2, Navigation,
  Moon, Sun // Add these icons
} from 'lucide-react';
import Link from 'next/link';
import DepartmentSheet from './components/DepartmentSheet';
import ServiceModal from './components/ServiceModal';
import BottomNav from './components/BottomNav';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Service');
  const [showDepartmentSheet, setShowDepartmentSheet] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [location, setLocation] = useState('New York, USA');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showLocationButton, setShowLocationButton] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Add dark mode state

  const tabs = ['Service', 'Shopping', 'Resell'];
  
  const departments = [
    { name: 'All', icon: 'A', bgColor: 'bg-gray-card' },
    { name: 'Home\nAppliances', icon: '🏠', bgColor: 'bg-gray-card' },
    { name: 'Computer', icon: '💻', bgColor: 'bg-gray-card' },
    { name: 'Mobile', icon: '📱', bgColor: 'bg-gray-card' },
  ];

  const services = [
    { name: 'AC Repair', icon: <Wrench size={22} className="text-blue-icon" />, bgColor: 'bg-blue-50' },
    { name: 'Fan', icon: <Fan size={22} className="text-blue-icon" />, bgColor: 'bg-blue-50' },
    { name: 'Smart TV', icon: <Tv size={22} className="text-blue-icon" />, bgColor: 'bg-blue-50' },
    { name: 'Fridge', icon: <Refrigerator size={22} className="text-blue-icon" />, bgColor: 'bg-blue-50' },
    { name: 'Mobile', icon: <Smartphone size={22} className="text-blue-icon" />, bgColor: 'bg-blue-50' },
    { name: 'Laptop', icon: <Laptop size={22} className="text-blue-icon" />, bgColor: 'bg-blue-50' },
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply to body
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Check for saved dark mode preference on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Get location from IP address as fallback
  const getLocationFromIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.city && data.country_name) {
        return `${data.city}, ${data.country_name}`;
      }
      return null;
    } catch (error) {
      console.error('IP location error:', error);
      return null;
    }
  };

  // Simplified reverse geocoding
  const getCityFromCoordinates = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data.city) {
        return `${data.city}, ${data.countryName}`;
      }
      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  };

  // Get user's current location
  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    
    if (!navigator.geolocation) {
      const ipLocation = await getLocationFromIP();
      if (ipLocation) {
        setLocation(ipLocation);
      }
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const cityName = await getCityFromCoordinates(latitude, longitude);
          if (cityName) {
            setLocation(cityName);
          } else {
            const ipLocation = await getLocationFromIP();
            if (ipLocation) setLocation(ipLocation);
          }
        } catch (error) {
          console.error('Error in location processing:', error);
          const ipLocation = await getLocationFromIP();
          if (ipLocation) setLocation(ipLocation);
        }
        setLoadingLocation(false);
      },
      async (error) => {
        console.error('Geolocation error:', error);
        
        const ipLocation = await getLocationFromIP();
        if (ipLocation) {
          setLocation(ipLocation);
        } else {
          setShowLocationButton(true);
        }
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000
      }
    );
  };

  // Manual location update function
  const updateLocationManually = () => {
    setShowLocationButton(false);
    getCurrentLocation();
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowServiceModal(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-bg'} pb-24 transition-colors duration-300`}>
      {/* Dark/Light Mode Toggle Button - Top Right Corner */}
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

      {/* Header - Modified */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} px-4 pt-6 pb-3`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className={`text-xl font-bold ${darkMode ? 'text-gray-200' : 'text-text-dark'}`}>
              Hi, User
            </h1>
            <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-text-gray'} text-sm mt-0.5`}>
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              {loadingLocation ? (
                <div className="flex items-center gap-1">
                  <Loader2 size={12} className="animate-spin" />
                  <span>Getting location...</span>
                </div>
              ) : showLocationButton ? (
                <div className="flex items-center gap-2">
                  <span className={darkMode ? 'text-red-400' : 'text-red-500'}>Location unavailable</span>
                  <button 
                    onClick={updateLocationManually}
                    className={`flex items-center gap-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-primary'} text-xs hover:opacity-80`}
                  >
                    <Navigation size={12} />
                    Retry
                  </button>
                </div>
              ) : (
                <span className="truncate">{location}</span>
              )}
            </div>
          </div>
          
          {/* Search Bar in Middle */}
          <div className="relative flex-1 mx-4 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className={darkMode ? 'text-gray-400' : 'text-text-light'} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2.5 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
                  : 'bg-gray-card text-text-dark placeholder-text-light'
              } border-0 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                darkMode ? 'focus:ring-yellow-500' : 'focus:ring-yellow-primary'
              }`}
            />
          </div>
          
          <button className={`w-10 h-10 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-gray-card'
          } flex items-center justify-center flex-shrink-0`}>
            <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-text-gray'} />
          </button>
        </div>
      </header>

      {/* RIDER MODE Button - Moved up */}
      <div className="px-4 mb-4">
        <button className={`w-full ${
          darkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-primary text-text-dark'
        } rounded-lg py-3 flex items-center justify-center gap-2 font-bold text-lg shadow-sm hover:opacity-90 transition-opacity`}>
          <Bike size={20} />
          RIDER MODE
        </button>
      </div>

      {/* Service Tabs */}
      <div className="px-4 mb-4">
        <div className={`flex ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-1 shadow-soft`}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-md text-sm font-medium ${
                activeTab === tab 
                  ? `${
                      darkMode 
                        ? 'bg-yellow-500 text-gray-900' 
                        : 'bg-yellow-primary text-text-dark'
                    } shadow-sm` 
                  : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-text-gray hover:text-text-dark'}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* LIMITED OFFER Card */}
      <div className="px-4 mb-6">
        <div className={`${
          darkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
            : 'bg-gradient-to-r from-gray-900 to-gray-800'
        } rounded-2xl p-5 text-white shadow-hard`}>
          <div className={`text-sm font-medium ${
            darkMode ? 'text-yellow-300' : 'text-yellow-300'
          } mb-1`}>
            LIMITED OFFER
          </div>
          <h2 className="text-xl font-bold mb-4">Get 20% off on your first AC Service</h2>
          <Link href="/services">
            <button className={`w-full ${
              darkMode 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' 
                : 'bg-yellow-primary text-text-dark hover:bg-yellow-dark'
            } font-bold py-3 rounded-xl transition-colors shadow-md`}>
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Department Section */}
      <section className={`${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } mx-4 rounded-xl p-4 mb-6 shadow-soft`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-bold ${
            darkMode ? 'text-gray-200' : 'text-text-dark'
          }`}>
            Department
          </h2>
          <button 
            onClick={() => setShowDepartmentSheet(true)}
            className={`${
              darkMode ? 'text-yellow-300 hover:text-yellow-200' : 'text-yellow-primary hover:text-yellow-dark'
            } text-sm font-medium`}
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {departments.map((dept, index) => (
            <button
              key={index}
              onClick={() => setShowDepartmentSheet(true)}
              className="flex flex-col items-center"
            >
              <div className={`w-14 h-14 ${
                darkMode ? 'bg-gray-700' : dept.bgColor
              } rounded-full flex items-center justify-center mb-2`}>
                <span className={`text-lg font-semibold ${
                  darkMode ? 'text-gray-200' : 'text-text-dark'
                }`}>
                  {dept.icon}
                </span>
              </div>
              <span className={`text-xs font-medium ${
                darkMode ? 'text-gray-300' : 'text-text-dark'
              } text-center whitespace-pre-line leading-tight`}>
                {dept.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Select Service Section */}
      <section className={`${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } mx-4 rounded-xl p-4 mb-24 shadow-soft`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className={`text-lg font-bold ${
            darkMode ? 'text-gray-200' : 'text-text-dark'
          }`}>
            Select Service
          </h2>
          <Link href="/services">
            <button className={`${
              darkMode ? 'text-yellow-300 hover:text-yellow-200' : 'text-yellow-primary hover:text-yellow-dark'
            } text-sm font-medium`}>
              See all
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => handleServiceClick(service.name)}
              className={`${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                  : 'bg-white hover:bg-gray-50 border-gray-100'
              } rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-medium active:scale-95 transition-all border w-full`}
            >
              <div className={`w-12 h-12 ${
                darkMode ? 'bg-gray-600' : service.bgColor
              } rounded-full flex items-center justify-center mb-3`}>
                {service.icon}
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-text-dark'
              } text-center leading-tight`}>
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Floating Cart */}
      <Link href="/payment">
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <div className={`${
            darkMode ? 'bg-gray-900' : 'bg-gray-900'
          } rounded-2xl p-3 text-white shadow-hard`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className={`w-8 h-8 ${
                    darkMode ? 'bg-yellow-500' : 'bg-yellow-primary'
                  } rounded-full flex items-center justify-center`}>
                    <span className="text-xs font-bold text-gray-900">1</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">+1</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold">2 Items added</span>
                  <p className="text-xs text-gray-300">¥399 total</p>
                </div>
              </div>
              <button className={`flex items-center gap-1 ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-text-dark hover:bg-gray-100'
              } px-3 py-1.5 rounded-lg text-sm font-bold transition-colors`}>
                View Cart
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Department Bottom Sheet */}
      <DepartmentSheet 
        isOpen={showDepartmentSheet}
        onClose={() => setShowDepartmentSheet(false)}
      />

      {/* Service Modal */}
      <ServiceModal 
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        serviceName={selectedService}
      />
    </div>
  );
}