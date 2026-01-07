"use client";

import { useState } from "react";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  Filter,
  Search,
  ArrowRight,
  ChevronRight,
  Star,
  Download,
  Share2,
  Repeat,
  HelpCircle
} from "lucide-react";

// Define Order Type
type OrderType = {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled" | "Returned";
  items: {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  deliveryDate?: string;
  trackingId?: string;
  paymentMethod: "Credit Card" | "PayPal" | "Cash on Delivery" | "UPI";
};

// Sample Orders Data
const orders: OrderType[] = [
  {
    id: "ORD-2024-78945",
    date: "15 Oct 2023",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Smart Watch Series 8 - GPS, Cellular",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 399.99
      },
      {
        id: 2,
        name: "Wireless Earbuds",
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e5?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 129.99
      }
    ],
    totalAmount: 529.98,
    deliveryDate: "18 Oct 2023",
    trackingId: "TRK789456123",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2024-78944",
    date: "12 Oct 2023",
    status: "Shipped",
    items: [
      {
        id: 3,
        name: "Premium Laptop - 16GB RAM, 512GB SSD",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 1299.99
      }
    ],
    totalAmount: 1299.99,
    deliveryDate: "20 Oct 2023",
    trackingId: "TRK456789123",
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-78943",
    date: "10 Oct 2023",
    status: "Processing",
    items: [
      {
        id: 4,
        name: "Refrigerator - 320L Double Door",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 459.99
      },
      {
        id: 5,
        name: "Microwave Oven - 28L Convection",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 149.99
      }
    ],
    totalAmount: 609.98,
    paymentMethod: "Cash on Delivery"
  },
  {
    id: "ORD-2024-78942",
    date: "5 Oct 2023",
    status: "Cancelled",
    items: [
      {
        id: 6,
        name: "Gaming Monitor - 27 inch, 144Hz",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 299.99
      }
    ],
    totalAmount: 299.99,
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-2024-78941",
    date: "1 Oct 2023",
    status: "Delivered",
    items: [
      {
        id: 7,
        name: "Washing Machine - 8kg Fully Automatic",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 399.99
      },
      {
        id: 8,
        name: "Air Conditioner - 1.5 Ton",
        image: "https://images.unsplash.com/photo-1561648258-9f3c5a8b3b0f?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 699.99
      }
    ],
    totalAmount: 1099.98,
    deliveryDate: "5 Oct 2023",
    trackingId: "TRK123456789",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-2024-78940",
    date: "28 Sep 2023",
    status: "Returned",
    items: [
      {
        id: 9,
        name: "Designer Men's Leather Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80",
        quantity: 1,
        price: 299.99
      }
    ],
    totalAmount: 299.99,
    paymentMethod: "UPI"
  }
];

const statusFilters = ["All", "Delivered", "Processing", "Shipped", "Cancelled", "Returned"];
const timeFilters = ["Last 30 days", "Last 3 months", "2023", "2022", "Older"];

// Order Status Component
function OrderStatus({ status }: { status: OrderType["status"] }) {
  const statusConfig = {
    Delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    Processing: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
    Shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
    Cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    Returned: { icon: Repeat, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.border} border`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={`text-xs font-medium ${config.color}`}>{status}</span>
    </div>
  );
}

// Order Item Component
function OrderItem({ order }: { order: OrderType }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 hover:shadow-md transition-shadow">
      {/* Order Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Order #{order.id}</p>
                <p className="text-xs text-gray-500">Placed on {order.date}</p>
              </div>
            </div>
          </div>
          <OrderStatus status={order.status} />
        </div>
      </div>

      {/* Order Items */}
      <div className="p-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="text-lg font-bold text-gray-900">₹{order.totalAmount.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Payment</p>
            <p className="text-sm font-medium text-gray-700">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {order.status === "Delivered" && (
            <>
              <button className="flex-1 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Rate & Review
              </button>
              <button className="flex-1 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Buy Again
              </button>
            </>
          )}
          
          {order.status === "Shipped" && order.trackingId && (
            <button className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Track Order
            </button>
          )}
          
          {order.status === "Processing" && (
            <button className="flex-1 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
              View Details
            </button>
          )}
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            {showDetails ? "Hide Details" : "View Details"}
            <ChevronRight className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* Additional Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              {order.trackingId && (
                <div>
                  <p className="text-xs text-gray-500">Tracking ID</p>
                  <p className="text-sm font-medium text-gray-700">{order.trackingId}</p>
                </div>
              )}
              {order.deliveryDate && (
                <div>
                  <p className="text-xs text-gray-500">Delivery Date</p>
                  <p className="text-sm font-medium text-gray-700">{order.deliveryDate}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Invoice
              </button>
              <button className="flex-1 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex-1 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Help
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Bottom Navigation Component
function BottomNav({ activeTab = 'orders' }: { activeTab?: string }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'saved', label: 'Saved', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 max-w-md mx-auto shadow-lg z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center relative transition-colors ${activeTab === item.id ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute -bottom-1 w-6 h-0.5 bg-black rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Orders Page Component
export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeTimeFilter, setActiveTimeFilter] = useState("Last 30 days");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Filter orders based on status and search
  const applyFilters = () => {
    let result = orders;

    // Status filter
    if (activeStatus !== "All") {
      result = result.filter(order => order.status === activeStatus);
    }

    // Time filter
    const now = new Date();
    if (activeTimeFilter === "Last 30 days") {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      result = result.filter(order => new Date(order.date) >= thirtyDaysAgo);
    } else if (activeTimeFilter === "Last 3 months") {
      const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
      result = result.filter(order => new Date(order.date) >= threeMonthsAgo);
    } else if (activeTimeFilter === "2023") {
      result = result.filter(order => order.date.includes("2023"));
    } else if (activeTimeFilter === "2022") {
      result = result.filter(order => order.date.includes("2022"));
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(result);
  };

  // Status counts
  const statusCounts = {
    All: orders.length,
    Delivered: orders.filter(o => o.status === "Delivered").length,
    Processing: orders.filter(o => o.status === "Processing").length,
    Shipped: orders.filter(o => o.status === "Shipped").length,
    Cancelled: orders.filter(o => o.status === "Cancelled").length,
    Returned: orders.filter(o => o.status === "Returned").length
  };

  // Calculate total spent
  const totalSpent = orders
    .filter(order => order.status === "Delivered")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative pb-16">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Device Info */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-sm text-gray-500">Track and manage your orders</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeStatus === status
                    ? "bg-black text-white"
                    : "bg-white border text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{status}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeStatus === status ? "bg-white text-black" : "bg-gray-100 text-gray-600"
                }`}>
                  {statusCounts[status as keyof typeof statusCounts]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Filters */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Time Period</span>
            <div className="flex gap-2 overflow-x-auto">
              {timeFilters.map((time) => (
                <button
                  key={time}
                  onClick={() => setActiveTimeFilter(time)}
                  className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                    activeTimeFilter === time
                      ? "bg-blue-100 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 pb-24 pt-4">
        {filteredOrders.length > 0 ? (
          <div>
            {filteredOrders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {activeStatus !== "All" 
                ? `No ${activeStatus.toLowerCase()} orders in ${activeTimeFilter.toLowerCase()}`
                : `No orders found matching "${searchQuery}"`}
            </p>
            <button
              onClick={() => {
                setActiveStatus("All");
                setActiveTimeFilter("Last 30 days");
                setSearchQuery("");
              }}
              className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              View All Orders
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions Bar */}
      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <div className="flex justify-between items-center">
            <button className="flex flex-col items-center text-gray-600 hover:text-black">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-1">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs">Track</span>
            </button>
            
            <button className="flex flex-col items-center text-gray-600 hover:text-black">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-1">
                <Repeat className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs">Returns</span>
            </button>
            
            <button className="flex flex-col items-center text-gray-600 hover:text-black">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center mb-1">
                <HelpCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-xs">Help</span>
            </button>
            
            <button className="flex flex-col items-center text-gray-600 hover:text-black">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-1">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs">Invoices</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="orders" />
    </div>
  );
}