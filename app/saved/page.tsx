"use client";

import { Heart, Filter, Home, Monitor, Smartphone, Shirt, BookOpen, Wand2 } from "lucide-react";
import { useState } from "react";

// Define Type
type SavedItemType = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  savedDate: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount: number;
  deliveryDate?: string;
};

// Sample Data with Home Appliances & Computers
const savedItems: SavedItemType[] = [
  {
    id: 1,
    title: "Smart Watch Series 8 - GPS, Cellular, Fitness Tracker",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=764&q=80",
    category: "Electronics",
    savedDate: "2023-10-15",
    brand: "Apple",
    rating: 4.5,
    reviews: 1289,
    inStock: true,
    discount: 15,
    deliveryDate: "Tomorrow, 10 AM - 2 PM"
  },
  {
    id: 2,
    title: "Premium Gaming Laptop - 16GB RAM, 1TB SSD, RTX 4060",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1032&q=80",
    category: "Computers",
    savedDate: "2023-10-10",
    brand: "Dell",
    rating: 4.7,
    reviews: 856,
    inStock: true,
    discount: 10,
    deliveryDate: "Today, 5 PM - 9 PM"
  },
  {
    id: 3,
    title: "Refrigerator - 320L Double Door, Frost Free",
    price: 459.99,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
    category: "Home Appliances",
    savedDate: "2023-10-08",
    brand: "Samsung",
    rating: 4.3,
    reviews: 1245,
    inStock: true,
    discount: 20,
    deliveryDate: "Tomorrow, 2 PM - 6 PM"
  },
  {
    id: 4,
    title: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1099&q=80",
    category: "Electronics",
    savedDate: "2023-10-05",
    brand: "Sony",
    rating: 4.8,
    reviews: 2456,
    inStock: true,
    discount: 20
  },
  {
    id: 5,
    title: "Desktop Computer - Intel i7, 16GB RAM, 512GB SSD",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
    category: "Computers",
    savedDate: "2023-10-03",
    brand: "HP",
    rating: 4.6,
    reviews: 567,
    inStock: true,
    discount: 12
  },
  {
    id: 6,
    title: "Washing Machine - 8kg Fully Automatic",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    category: "Home Appliances",
    savedDate: "2023-10-01",
    brand: "LG",
    rating: 4.4,
    reviews: 890,
    inStock: true,
    discount: 18,
    deliveryDate: "Today, 11 AM - 3 PM"
  },
  {
    id: 7,
    title: "Air Conditioner - 1.5 Ton, 5 Star Inverter",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1561648258-9f3c5a8b3b0f?auto=format&fit=crop&w=800&q=80",
    category: "Home Appliances",
    savedDate: "2023-09-28",
    brand: "Voltas",
    rating: 4.2,
    reviews: 678,
    inStock: false,
    discount: 25
  },
  {
    id: 8,
    title: "Gaming Monitor - 27 inch, 144Hz, 1ms",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    category: "Computers",
    savedDate: "2023-09-25",
    brand: "ASUS",
    rating: 4.9,
    reviews: 1234,
    inStock: true,
    discount: 15
  },
  {
    id: 9,
    title: "Microwave Oven - 28L Convection",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    category: "Home Appliances",
    savedDate: "2023-09-22",
    brand: "Panasonic",
    rating: 4.1,
    reviews: 456,
    inStock: true,
    discount: 10
  },
  {
    id: 10,
    title: "Laptop Stand with Cooling Fan",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586950012036-b957f2c7cbf1?auto=format&fit=crop&w=800&q=80",
    category: "Computers",
    savedDate: "2023-09-20",
    brand: "Amazon Basics",
    rating: 4.0,
    reviews: 789,
    inStock: true,
    discount: 5
  }
];

const categories = [
  { name: "All Items", icon: <Heart className="w-4 h-4" /> },
  { name: "Home Appliances", icon: <Home className="w-4 h-4" /> },
  { name: "Computers", icon: <Monitor className="w-4 h-4" /> },
  { name: "Electronics", icon: <Smartphone className="w-4 h-4" /> },
  { name: "Fashion", icon: <Shirt className="w-4 h-4" /> },
  { name: "Books", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Beauty", icon: <Wand2 className="w-4 h-4" /> }
];

// Saved Item Component
function SavedItem({ item, onRemove }: { item: SavedItemType; onRemove: (id: number) => void }) {
  const [isSaved, setIsSaved] = useState(true);

  const handleRemove = () => {
    setIsSaved(false);
    setTimeout(() => {
      onRemove(item.id);
    }, 300);
  };

  const handleAddToCart = () => {
    alert(`"${item.title}" added to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Buying "${item.title}" now!`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!isSaved) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md mb-4">
      <div className="p-4">
        <div className="flex">
          {/* Product Image */}
          <div className="relative w-28 h-28 flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
            {item.discount > 0 && (
              <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                -{item.discount}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 pl-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    item.category === "Home Appliances" 
                      ? "bg-amber-100 text-amber-800" 
                      : item.category === "Computers" 
                      ? "bg-orange-100 text-orange-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {item.category}
                  </span>
                  {!item.inStock && (
                    <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500">{item.brand}</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-1">
                      {"★".repeat(Math.floor(item.rating))}
                      {"☆".repeat(5 - Math.floor(item.rating))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.price.toFixed(2)}
                  </span>
                  {item.discount > 0 && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{(item.price * 100 / (100 - item.discount)).toFixed(2)}
                      </span>
                      <span className="text-xs text-amber-600 font-medium">
                        Save ₹{((item.price * item.discount) / 100).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {item.deliveryDate && (
                  <div className="flex items-center text-xs text-amber-600 mb-2">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free delivery {item.deliveryDate}
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleRemove}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove from saved"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-lg transition-colors ${isSaved ? "text-red-500 hover:text-red-600 hover:bg-red-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                >
                  <svg className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddToCart}
                disabled={!item.inStock}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  item.inStock
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {item.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!item.inStock}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.inStock
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Buy Now
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">
                Saved on {formatDate(item.savedDate)}
              </p>
              <button className="text-xs text-amber-600 hover:text-amber-800">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Bottom Navigation Component
function BottomNav({ activeTab = 'saved', savedCount = 0 }: { activeTab?: string; savedCount?: number }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 max-w-md mx-auto shadow-lg z-50">
      <div className="flex justify-between items-center">
        {['home', 'search', 'saved', 'cart', 'profile'].map((tab) => (
          <button
            key={tab}
            className={`flex flex-col items-center relative transition-colors ${activeTab === tab ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="relative">
              {tab === 'saved' && savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {savedCount > 9 ? '9+' : savedCount}
                </span>
              )}
              {/* Icons */}
              {tab === 'home' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )}
              {tab === 'search' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              {tab === 'saved' && (
                <svg className={`w-5 h-5 ${activeTab === 'saved' ? 'fill-amber-600 text-amber-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              {tab === 'cart' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )}
              {tab === 'profile' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            <span className="text-xs mt-1 capitalize">{tab}</span>
            {activeTab === tab && (
              <div className="absolute -bottom-1 w-6 h-0.5 bg-amber-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Page Component
export default function SavedPage() {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [sortBy, setSortBy] = useState("Recently Added");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [items, setItems] = useState(savedItems);

  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + item.price, 0);

  // Back button click handler
  const handleBackToHome = () => {
    // Homepage पर navigate करें
    window.location.href = "http://localhost:3000";
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    if (category === "All Items") {
      setItems(savedItems);
    } else {
      const filtered = savedItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
      setItems(filtered);
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const sortOptions = ["Recently Added", "Price: Low to High", "Price: High to Low", "Discount: High to Low", "Rating: High to Low"];

  // Category counts
  const categoryCounts = categories.map(cat => ({
    name: cat.name,
    count: cat.name === "All Items" 
      ? savedItems.length 
      : savedItems.filter(item => item.category === cat.name).length
  }));

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Device Info */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Phone 12 Pro</span>
            <span className="text-gray-400">•</span>
            <span>390 × 844</span>
            <span className="text-gray-400">•</span>
            <span>50%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">No throttling</span>
            <span className="text-gray-400">•</span>
            <span className="text-blue-300">Save-Data</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Back Button - Now Clickable */}
              <button 
                onClick={handleBackToHome}
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                title="Go back to Home"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Your personal wishlist
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Saved</p>
              <p className="text-2xl font-bold text-gray-900">{totalItems} items</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-sm">
            <div className="text-center">
              <div className="text-amber-600 font-semibold">
                {savedItems.filter(item => item.category === "Home Appliances").length}
              </div>
              <div className="text-gray-500 text-xs">Appliances</div>
            </div>
            <div className="text-center">
              <div className="text-orange-600 font-semibold">
                {savedItems.filter(item => item.category === "Computers").length}
              </div>
              <div className="text-gray-500 text-xs">Computers</div>
            </div>
            <div className="text-center">
              <div className="text-amber-700 font-semibold">
                {savedItems.filter(item => item.category === "Electronics").length}
              </div>
              <div className="text-gray-500 text-xs">Electronics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const count = categoryCounts.find(c => c.name === cat.name)?.count || 0;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryFilter(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.name
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-white border text-gray-700 hover:bg-amber-50 hover:border-amber-200"
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
                <span className={`text-xs ${
                  activeCategory === cat.name ? "bg-white text-amber-600" : "bg-amber-100 text-amber-700"
                } px-1.5 py-0.5 rounded-full`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort Bar */}
      <div className="px-4 py-3 flex justify-between items-center border-b border-gray-100">
        <p className="text-gray-600 text-sm">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} saved
        </p>
        <div className="relative">
          <button 
            onClick={() => setShowSortOptions(!showSortOptions)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Sort: {sortBy}</span>
          </button>
          
          {/* Sort Dropdown */}
          {showSortOptions && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-amber-200 rounded-lg shadow-lg py-2 z-50 min-w-[180px]">
              {sortOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortOptions(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${
                    sortBy === option ? "text-amber-700 font-medium bg-amber-50" : "text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="px-4 pb-24">
        {items.length > 0 ? (
          <div className="py-4">
            {items.map((item) => (
              <SavedItem key={item.id} item={item} onRemove={handleRemoveItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-inner">
              <Heart className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No saved items found
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              {activeCategory !== "All Items" 
                ? `No items found in ${activeCategory}. Try another category.`
                : "Start saving items you love to see them here."}
            </p>
            {activeCategory !== "All Items" && (
              <button
                onClick={() => handleCategoryFilter("All Items")}
                className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition-colors text-sm"
              >
                View All Items
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="saved" savedCount={totalItems} />
    </div>
  );
}