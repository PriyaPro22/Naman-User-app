// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { 
//   Search, Bell, MapPin, User, Edit2, Settings, 
//   ShoppingBag, Heart, Clock, Star, Package, 
//   HelpCircle, LogOut, ChevronRight, ArrowLeft,
//   Home, Grid3x3, ShoppingCart, User as UserIcon,
//   Smartphone, Tv, Wind, Refrigerator, Laptop,
//   Shield, CreditCard, FileText, MessageSquare
// } from 'lucide-react';

// export default function ProfilePage() {
//   const [activeTab, setActiveTab] = useState('My Bookings');
  
//   // User details
//   const [userDetails, setUserDetails] = useState({
//     name: "User",
//     location: "New York, USA",
//     phone: "+1 (555) 123-4567",
//     email: "user@example.com",
//     joinedDate: "Joined Jan 2024"
//   });

//   // Bookings data
//   const bookings = [
//     {
//       id: 1,
//       service: "AC Repair Service",
//       date: "Today, 10:30 AM",
//       status: "Confirmed",
//       technician: "John D.",
//       rating: 4.8,
//       price: "₹599",
//       icon: <Wind size={20} className="text-yellow-600" />
//     },
//     {
//       id: 2,
//       service: "Smart TV Installation",
//       date: "Yesterday, 2:00 PM",
//       status: "Completed",
//       technician: "Mike S.",
//       rating: 4.9,
//       price: "₹299",
//       icon: <Tv size={20} className="text-orange-600" />
//     },
//     {
//       id: 3,
//       service: "Refrigerator Gas Charging",
//       date: "Dec 28, 2023",
//       status: "Completed",
//       technician: "Robert K.",
//       rating: 4.7,
//       price: "₹899",
//       icon: <Refrigerator size={20} className="text-amber-600" />
//     }
//   ];

//   // Quick actions
//   const quickActions = [
//     { id: 1, name: "My Addresses", icon: <MapPin size={24} />, count: 3 },
//     { id: 2, name: "Saved Services", icon: <Heart size={24} />, count: 12 },
//     { id: 3, name: "Payment Methods", icon: <CreditCard size={24} />, count: 2 },
//     { id: 4, name: "Help & Support", icon: <HelpCircle size={24} /> }
//   ];

//   // Settings options
//   const settingsOptions = [
//     { id: 1, name: "Edit Profile", icon: <Edit2 size={20} /> },
//     { id: 2, name: "Notification Settings", icon: <Bell size={20} /> },
//     { id: 3, name: "Privacy & Security", icon: <Shield size={20} /> },
//     { id: 4, name: "Terms & Conditions", icon: <FileText size={20} /> },
//     { id: 5, name: "Contact Us", icon: <MessageSquare size={20} /> },
//     { id: 6, name: "Logout", icon: <LogOut size={20} />, color: "text-red-600" }
//   ];

//   const handleLogout = () => {
//     if (confirm("Are you sure you want to logout?")) {
//       // Handle logout logic here
//       console.log("User logged out");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-24">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 sticky top-0 z-40 shadow-lg">
//         <div className="px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
//                   <User size={24} className="text-yellow-600" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-yellow-500"></div>
//               </div>
//               <div>
//                 <h1 className="text-lg font-bold text-white">Hi, {userDetails.name}</h1>
//                 <div className="flex items-center gap-1">
//                   <MapPin size={14} className="text-yellow-200" />
//                   <span className="text-sm text-yellow-100">{userDetails.location}</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <button className="p-2 relative hover:bg-yellow-400/30 rounded-full transition-colors">
//                 <Bell size={22} className="text-white" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button className="p-2 hover:bg-yellow-400/30 rounded-full transition-colors">
//                 <Settings size={22} className="text-white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Search Bar */}
//       <div className="px-4 py-3">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//             <Search size={20} className="text-yellow-500" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search services, technicians..."
//             className="w-full pl-12 pr-4 py-3.5 bg-white border border-yellow-300 rounded-xl text-gray-900 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
//           />
//         </div>
//       </div>

//       {/* Limited Offer Banner */}
//       <div className="px-4 mb-4">
//         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-4 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-xs font-bold bg-yellow-500/40 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-2">
//                 LIMITED OFFER
//               </div>
//               <h3 className="text-lg font-bold mb-1">Get 20% off on your first AC Service</h3>
//               <p className="text-sm opacity-90">Valid till 31st Jan 2024</p>
//             </div>
//             <button className="bg-white text-yellow-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
//               Book Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions Grid */}
//       <section className="px-4 mb-6">
//         <h2 className="text-lg font-bold text-yellow-900 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-4 gap-3">
//           {quickActions.map((action) => (
//             <button
//               key={action.id}
//               className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-yellow-200 hover:border-yellow-500 hover:shadow-md transition-all shadow-sm"
//             >
//               <div className="relative">
//                 <div className="text-yellow-600 mb-2">
//                   {action.icon}
//                 </div>
//                 {action.count && (
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm">
//                     {action.count}
//                   </span>
//                 )}
//               </div>
//               <span className="text-xs text-yellow-800 font-medium text-center">{action.name}</span>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* Tabs */}
//       <div className="px-4 mb-4">
//         <div className="flex overflow-x-auto pb-2 space-x-3">
//           {['My Bookings', 'My Orders', 'Wallet', 'Settings'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2.5 rounded-lg whitespace-nowrap font-medium text-sm transition-all ${
//                 activeTab === tab
//                   ? 'bg-yellow-500 text-white shadow-lg font-bold'
//                   : 'bg-white text-yellow-700 border border-yellow-300 shadow-sm hover:bg-yellow-50'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="px-4">
//         {activeTab === 'My Bookings' && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-yellow-900">Recent Bookings</h3>
//               <Link href="/all-bookings" className="text-sm text-yellow-600 font-medium">
//                 See all
//               </Link>
//             </div>
            
//             {bookings.map((booking) => (
//               <div key={booking.id} className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
//                       {booking.icon}
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-yellow-900">{booking.service}</h4>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className={`text-xs px-2 py-1 rounded-full ${
//                           booking.status === 'Confirmed'
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-yellow-50 text-yellow-700'
//                         }`}>
//                           {booking.status}
//                         </span>
//                         <span className="text-xs text-yellow-600">{booking.date}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-lg font-bold text-yellow-900">{booking.price}</div>
//                     <div className="flex items-center gap-1 text-xs text-yellow-700">
//                       <Star size={12} fill="#fbbf24" className="text-yellow-500" />
//                       {booking.rating}
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-3 border-t border-yellow-100">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//                       <User size={14} className="text-yellow-600" />
//                     </div>
//                     <span className="text-sm text-yellow-800">Tech: {booking.technician}</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="px-3 py-1.5 text-sm font-medium border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50">
//                       Track
//                     </button>
//                     <button className="px-3 py-1.5 text-sm font-medium bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-sm">
//                       Reschedule
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 'My Orders' && (
//           <div className="space-y-4">
//             <div className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                     <ShoppingBag size={24} className="text-yellow-600" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-yellow-900">No Orders Yet</h4>
//                     <p className="text-sm text-yellow-600">Your shopping orders will appear here</p>
//                   </div>
//                 </div>
//               </div>
//               <Link
//                 href="/services"
//                 className="w-full py-3 bg-yellow-500 text-white font-medium rounded-lg flex items-center justify-center hover:bg-yellow-600 shadow-md"
//               >
//                 Start Shopping
//               </Link>
//             </div>
//           </div>
//         )}

//         {activeTab === 'Wallet' && (
//           <div className="space-y-4">
//             <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
//               <div className="mb-2">
//                 <p className="text-sm opacity-90">Wallet Balance</p>
//                 <h2 className="text-3xl font-bold">₹2,450.00</h2>
//               </div>
//               <div className="text-sm opacity-80">**** **** **** 4567</div>
//               <div className="flex items-center justify-between mt-6">
//                 <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm hover:bg-white/30">
//                   Add Money
//                 </button>
//                 <button className="px-4 py-2 bg-white text-yellow-600 font-medium rounded-lg hover:bg-gray-100 shadow-sm">
//                   Withdraw
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl p-4 border border-yellow-200 shadow-sm">
//               <h3 className="font-bold text-yellow-900 mb-4">Recent Transactions</h3>
//               <div className="space-y-3">
//                 {[
//                   { type: 'Credit', desc: 'Added to Wallet', amount: '₹1,000', date: 'Today', color: 'text-green-600' },
//                   { type: 'Debit', desc: 'AC Service Payment', amount: '-₹599', date: 'Yesterday', color: 'text-red-600' },
//                   { type: 'Credit', desc: 'Cashback', amount: '₹100', date: '2 days ago', color: 'text-green-600' },
//                 ].map((txn, idx) => (
//                   <div key={idx} className="flex items-center justify-between py-2">
//                     <div>
//                       <p className="font-medium text-yellow-900">{txn.desc}</p>
//                       <p className="text-xs text-yellow-600">{txn.date}</p>
//                     </div>
//                     <div className={`font-bold ${txn.color}`}>{txn.amount}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'Settings' && (
//           <div className="space-y-2">
//             {settingsOptions.map((option) => (
//               <button
//                 key={option.id}
//                 onClick={option.name === 'Logout' ? handleLogout : undefined}
//                 className={`w-full flex items-center justify-between p-4 bg-white rounded-xl border border-yellow-200 hover:border-yellow-300 hover:shadow-sm transition-all ${
//                   option.color || 'text-yellow-900'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${
//                     option.name === 'Logout' ? 'bg-red-50' : 'bg-yellow-50'
//                   }`}>
//                     <div className={option.color || 'text-yellow-700'}>
//                       {option.icon}
//                     </div>
//                   </div>
//                   <span className="font-medium">{option.name}</span>
//                 </div>
//                 <ChevronRight size={18} className="text-yellow-400" />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Bottom Navigation */}
//       <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-yellow-300 py-3 shadow-hard z-50">
//         <div className="flex justify-around items-center">
//           <Link href="/" className="flex flex-col items-center text-yellow-500 hover:text-yellow-600">
//             <Home size={24} />
//             <span className="text-xs mt-1 font-semibold">Home</span>
//           </Link>
          
//           <Link href="/services" className="flex flex-col items-center text-yellow-500 hover:text-yellow-600">
//             <Grid3x3 size={24} />
//             <span className="text-xs mt-1 font-semibold">Services</span>
//           </Link>
          
//           <Link href="/cart" className="flex flex-col items-center text-yellow-500 hover:text-yellow-600 relative">
//             <ShoppingCart size={24} />
//             <span className="text-xs mt-1 font-semibold">Cart</span>
//           </Link>
          
//           <div className="flex flex-col items-center text-yellow-600">
//             <UserIcon size={24} />
//             <span className="text-xs mt-1 font-semibold">Profile</span>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Bell, MapPin, User, Edit2, Settings, 
  ShoppingBag, Heart, Clock, Star, Package, 
  HelpCircle, LogOut, ChevronRight, ArrowLeft,
  Home, Grid3x3, ShoppingCart, User as UserIcon,
  Smartphone, Tv, Wind, Refrigerator, Laptop,
  Shield, CreditCard, FileText, MessageSquare,
  Navigation, Bike, Store, RotateCcw
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Services');
  const [userLocation, setUserLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // User details
  const [userDetails, setUserDetails] = useState({
    name: "User",
    phone: "+1 (555) 123-4567",
    email: "user@example.com",
  });

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Using OpenStreetMap Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          
          if (data.address) {
            const location = `${data.address.city || data.address.town || data.address.village || ''}, ${data.address.country || ''}`.trim();
            setUserLocation(location || 'Location detected');
            setUserDetails(prev => ({ ...prev, location }));
            
            // Save to localStorage
            localStorage.setItem('userLocation', location);
          }
        } catch (error) {
          console.error('Error getting location:', error);
          setUserLocation('New York, USA');
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setUserLocation('New York, USA');
        setIsLoadingLocation(false);
      }
    );
  };

  // Load saved location on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setUserLocation(savedLocation);
      setUserDetails(prev => ({ ...prev, location: savedLocation }));
    } else {
      setUserLocation('New York, USA');
    }
  }, []);

  // Update location handler
  const handleUpdateLocation = () => {
    getCurrentLocation();
  };

  // Services data
  const services = [
    { id: 1, name: "AC Repair", icon: <Wind size={24} />, color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Fan", icon: <Wind size={24} />, color: "bg-green-100 text-green-600" },
    { id: 3, name: "Smart TV", icon: <Tv size={24} />, color: "bg-purple-100 text-purple-600" },
    { id: 4, name: "Fridge", icon: <Refrigerator size={24} />, color: "bg-cyan-100 text-cyan-600" },
    { id: 5, name: "Mobile", icon: <Smartphone size={24} />, color: "bg-pink-100 text-pink-600" },
    { id: 6, name: "Laptop", icon: <Laptop size={24} />, color: "bg-orange-100 text-orange-600" },
  ];

  // Departments
  const departments = [
    { id: 1, name: "All", active: true },
    { id: 2, name: "Home Appliances", active: false },
    { id: 3, name: "Computer", active: false },
    { id: 4, name: "Mobile", active: false },
  ];

  // Tabs
  const tabs = [
    { id: 'Services', label: 'Service' },
    { id: 'Shopping', label: 'Shopping' },
    { id: 'Resell', label: 'Resell' },
  ];

  // Profile options
  const profileOptions = [
    { id: 1, name: "Edit Profile", icon: <Edit2 size={20} />, route: "/editprofile" },
    { id: 2, name: "My Addresses", icon: <MapPin size={20} />, route: "/addresses" },
    { id: 3, name: "Saved Services", icon: <Heart size={20} />, route: "/saved" },
    { id: 4, name: "My Orders", icon: <ShoppingBag size={20} />, route: "/orders" },
    { id: 5, name: "Payment Methods", icon: <CreditCard size={20} />, route: "/payments" },
    { id: 6, name: "Help & Support", icon: <HelpCircle size={20} />, route: "/help" },
    { id: 7, name: "Settings", icon: <Settings size={20} />, route: "/settings" },
    { id: 8, name: "Logout", icon: <LogOut size={20} />, color: "text-red-600", action: "logout" },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // Handle logout logic here
      console.log("User logged out");
      localStorage.removeItem('userLocation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-24">
      {/* Header with Profile */}
      <header className="bg-amber-400 sticky top-0 z-40 shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <User size={24} className="text-amber-600" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Hi, {userDetails.name}</h1>
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-gray-700" />
                  <span className="text-sm text-gray-800">
                    {isLoadingLocation ? 'Getting location...' : userLocation}
                  </span>
                  <button 
                    onClick={handleUpdateLocation}
                    className="ml-1 p-0.5 hover:bg-amber-300 rounded"
                    disabled={isLoadingLocation}
                  >
                    <Navigation size={12} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 relative hover:bg-amber-300 rounded-full transition-colors">
                <Bell size={22} className="text-gray-800" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-amber-500" />
          </div>
          <input
            type="text"
            placeholder="Search services, products..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Rider Mode Button */}
      <div className="px-4 mb-4">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-md">
          <Bike size={20} />
          <span className="font-bold">RIDER MODE</span>
        </button>
      </div>

      {/* Tabs - Service, Shopping, Resell */}
      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-gray-900 font-bold shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Limited Offer Banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-4 text-gray-900 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold bg-white/60 px-3 py-1 rounded-full inline-block mb-2">
                LIMITED OFFER
              </div>
              <h3 className="text-lg font-bold mb-1">Get 20% off on your first AC Service</h3>
              <p className="text-sm opacity-90">Valid till 31st Jan 2024</p>
            </div>
            <button className="bg-white text-amber-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-md">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Department Section */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Department</h2>
          <button className="text-sm text-amber-600 font-medium">See all</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                dept.active
                  ? 'bg-amber-400 text-gray-900 font-bold'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </section>

      {/* Select Service Section */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Select Service</h2>
          <button className="text-sm text-amber-600 font-medium">See all</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center mb-2`}>
                {service.icon}
              </div>
              <span className="text-sm text-gray-900 font-medium text-center">{service.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Profile Options Section */}
      <section className="px-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {profileOptions.map((option, index) => (
            <div key={option.id}>
              {option.action === 'logout' ? (
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center justify-between p-4 ${option.color || 'text-gray-900'} hover:bg-gray-50 ${
                    index !== profileOptions.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      option.color === 'text-red-600' ? 'bg-red-50' : 'bg-amber-50'
                    }`}>
                      <div className={option.color || 'text-gray-700'}>
                        {option.icon}
                      </div>
                    </div>
                    <span className="font-medium">{option.name}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ) : (
                <Link
                  href={option.route || '#'}
                  className={`w-full flex items-center justify-between p-4 ${option.color || 'text-gray-900'} hover:bg-gray-50 ${
                    index !== profileOptions.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      option.color === 'text-red-600' ? 'bg-red-50' : 'bg-amber-50'
                    }`}>
                      <div className={option.color || 'text-gray-700'}>
                        {option.icon}
                      </div>
                    </div>
                    <span className="font-medium">{option.name}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard z-50">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-amber-500">
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <Link href="/services" className="flex flex-col items-center text-gray-500 hover:text-amber-500">
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Services</span>
          </Link>
          
          <Link href="/cart" className="flex flex-col items-center text-gray-500 hover:text-amber-500 relative">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          
          <div className="flex flex-col items-center text-amber-500">
            <UserIcon size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </div>
        </div>
      </nav>
    </div>
  );
}