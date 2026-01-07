"use client";

import { useState } from "react";
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  HelpCircle, 
  FileText, 
  Shield, 
  Truck,
  RefreshCw,
  CreditCard,
  Package,
  User,
  ChevronRight,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

// FAQ Categories
const faqCategories = [
  { id: "orders", name: "Orders & Delivery", icon: <Package className="w-6 h-6" />, count: 12 },
  { id: "payments", name: "Payments & Refunds", icon: <CreditCard className="w-6 h-6" />, count: 8 },
  { id: "returns", name: "Returns & Replacements", icon: <RefreshCw className="w-6 h-6" />, count: 10 },
  { id: "account", name: "Account & Security", icon: <User className="w-6 h-6" />, count: 6 },
  { id: "products", name: "Products & Quality", icon: <Shield className="w-6 h-6" />, count: 7 },
  { id: "delivery", name: "Delivery & Shipping", icon: <Truck className="w-6 h-6" />, count: 9 }
];

// FAQ Questions
const faqQuestions = [
  {
    id: 1,
    category: "orders",
    question: "How can I track my order?",
    answer: "You can track your order by going to 'My Orders' section in your account. Click on the specific order and you'll see the tracking details. You'll also receive SMS and email updates."
  },
  {
    id: 2,
    category: "orders",
    question: "How long does delivery take?",
    answer: "Delivery time varies based on your location and product availability. Standard delivery: 3-7 business days. Express delivery: 1-2 business days. You'll see estimated delivery date during checkout."
  },
  {
    id: 3,
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "We accept Credit/Debit Cards (Visa, MasterCard, RuPay), UPI, Net Banking, Paytm, PhonePe, and Cash on Delivery for eligible orders."
  },
  {
    id: 4,
    category: "payments",
    question: "How do I get a refund?",
    answer: "Refunds are processed within 5-7 business days after we receive the returned item. The amount is credited back to your original payment method. You can track refund status in 'My Orders'."
  },
  {
    id: 5,
    category: "returns",
    question: "What is your return policy?",
    answer: "We offer 10-day return policy for most products. Items must be unused, in original packaging with all tags. Some products like innerwear, personalized items are non-returnable."
  },
  {
    id: 6,
    category: "account",
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on login page. Enter your registered email/mobile number. You'll receive OTP to reset password. Ensure you use a strong password with 8+ characters including numbers and symbols."
  }
];

// Contact Options
const contactOptions = [
  {
    id: 1,
    title: "Chat with us",
    description: "24/7 Live chat support",
    icon: <MessageCircle className="w-8 h-8" />,
    color: "bg-blue-100 text-blue-600",
    action: "Start Chat",
    time: "Instant response"
  },
  {
    id: 2,
    title: "Call us",
    description: "Speak with support agent",
    icon: <Phone className="w-8 h-8" />,
    color: "bg-green-100 text-green-600",
    action: "Call Now",
    time: "9 AM - 9 PM"
  },
  {
    id: 3,
    title: "Email us",
    description: "Get detailed assistance",
    icon: <Mail className="w-8 h-8" />,
    color: "bg-purple-100 text-purple-600",
    action: "Send Email",
    time: "24-hour response"
  },
  {
    id: 4,
    title: "FAQ",
    description: "Quick answers to common questions",
    icon: <HelpCircle className="w-8 h-8" />,
    color: "bg-orange-100 text-orange-600",
    action: "Browse FAQs",
    time: "Instant"
  }
];

// Issue Categories
const issueCategories = [
  { id: "delayed", name: "Order Delayed", icon: <Clock className="w-5 h-5" /> },
  { id: "damaged", name: "Damaged Product", icon: <AlertCircle className="w-5 h-5" /> },
  { id: "wrong", name: "Wrong Item Received", icon: <XCircle className="w-5 h-5" /> },
  { id: "refund", name: "Refund Issue", icon: <CreditCard className="w-5 h-5" /> },
  { id: "return", name: "Return Pickup", icon: <Truck className="w-5 h-5" /> },
  { id: "account", name: "Account Issue", icon: <User className="w-5 h-5" /> }
];

// Bottom Navigation Component
function BottomNav({ activeTab = 'help' }: { activeTab?: string }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'help', label: 'Help', icon: '❓' },
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

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-sm font-medium text-gray-900 pr-4">{question}</h3>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-3">
          <p className="text-sm text-gray-600">{answer}</p>
          <button className="mt-3 text-sm text-blue-600 font-medium hover:text-blue-800">
            Was this helpful?
          </button>
        </div>
      )}
    </div>
  );
}

// Main Help Page Component
export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const filteredQuestions = faqQuestions.filter(q => 
    (activeCategory === "all" || q.category === activeCategory) &&
    (searchQuery === "" || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative pb-16">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Device Info */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Phone 12 Pro • 390 × 844 • 50% • No throttling • Save-Data</span>
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
                <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
                <p className="text-sm text-gray-500">We're here to help you</p>
              </div>
            </div>
            
            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Get Quick Help</h2>
        <div className="grid grid-cols-2 gap-3">
          {contactOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${option.color}`}>
                {option.icon}
              </div>
              <h3 className="font-medium text-gray-900">{option.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-500">{option.time}</span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {option.action} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report an Issue */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Report an Issue</h3>
              <p className="text-sm text-gray-600 mt-1">Having trouble with an order? Let us know</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {issueCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedIssue(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedIssue === category.id
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>
              
              {selectedIssue && (
                <button className="w-full mt-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Report Issue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Help Categories</h2>
        <div className="flex overflow-x-auto gap-3 pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex flex-col items-center justify-center p-4 rounded-xl min-w-[100px] transition-all ${
              activeCategory === "all"
                ? "bg-black text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            <HelpCircle className="w-6 h-6 mb-2" />
            <span className="text-xs font-medium">All FAQs</span>
            <span className="text-xs mt-1 opacity-75">{faqQuestions.length} articles</span>
          </button>
          
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl min-w-[100px] transition-all ${
                activeCategory === category.id
                  ? "bg-black text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="mb-2">{category.icon}</div>
              <span className="text-xs font-medium text-center">{category.name}</span>
              <span className="text-xs mt-1 opacity-75">{category.count} articles</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Questions */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredQuestions.length} questions found
            </p>
          </div>
          
          <div className="p-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((faq) => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No questions found</p>
                <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Support Information */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Customer Support</h3>
              <div className="space-y-3 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Call us at</p>
                  <p className="text-lg font-bold text-gray-900">1800-123-4567</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email us at</p>
                  <p className="text-base font-medium text-gray-900">support@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-sm font-medium text-gray-900">24/7 for chat, 9 AM - 9 PM for calls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 py-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Terms of Service</p>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
            <Shield className="w-5 h-5 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Privacy Policy</p>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Return Policy</p>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-3 text-left hover:bg-gray-50 transition-colors">
            <Truck className="w-5 h-5 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Shipping Info</p>
          </button>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
            <div>
              <h3 className="font-semibold text-gray-900">Was this helpful?</h3>
              <p className="text-sm text-gray-600">Tell us how we can improve</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors">
              👍 Yes, it helped
            </button>
            <button className="flex-1 py-2.5 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
              👎 Need improvement
            </button>
          </div>
          
          <textarea
            placeholder="Share your suggestions..."
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            rows={2}
          />
          
          <button className="w-full mt-3 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="help" />
    </div>
  );
}