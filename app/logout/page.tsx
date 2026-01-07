"use client";

import { useState } from "react";
import { 
  LogOut, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Clock,
  Smartphone,
  Laptop,
  Tablet
} from "lucide-react";
import { useRouter } from "next/navigation";

// Active Sessions Data
const activeSessions = [
  {
    id: 1,
    device: "iPhone 12 Pro",
    type: "mobile",
    location: "Delhi, India",
    lastActive: "Current session",
    current: true,
    icon: <Smartphone className="w-5 h-5" />
  },
  {
    id: 2,
    device: "MacBook Pro",
    type: "desktop",
    location: "Mumbai, India",
    lastActive: "2 hours ago",
    current: false,
    icon: <Laptop className="w-5 h-5" />
  },
  {
    id: 3,
    device: "iPad Air",
    type: "tablet",
    location: "Bangalore, India",
    lastActive: "1 day ago",
    current: false,
    icon: <Tablet className="w-5 h-5" />
  }
];

export default function LogoutPage() {
  const router = useRouter();
  const [logoutAll, setLogoutAll] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<number[]>([2, 3]); // Default: Select other sessions

  const handleSessionToggle = (sessionId: number) => {
    if (sessionId === 1) return; // Don't allow toggling current session
    
    setSelectedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(logoutAll 
        ? "Logged out from all devices successfully!" 
        : `Logged out from ${selectedSessions.length} device(s) successfully!`
      );
      router.push("/login");
    }, 1500);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 max-w-md mx-auto shadow-xl relative">
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
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Logout</h1>
              <p className="text-sm text-gray-500">Secure your account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8">
        {/* Warning Card */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Logout Confirmation</h2>
              <p className="text-sm text-gray-600 mt-2">
                You are about to log out from your account. This will sign you out from selected devices.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-600">Your data will remain safe and secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                <p className="text-sm text-gray-600 mt-1">3 devices are logged in</p>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Active Now</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    session.current
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      session.current ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      {session.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{session.device}</h4>
                        {session.current && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{session.location}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{session.lastActive}</span>
                      </div>
                    </div>
                  </div>

                  {!session.current ? (
                    <button
                      onClick={() => handleSessionToggle(session.id)}
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                        selectedSessions.includes(session.id)
                          ? "bg-red-100 border-red-300 text-red-600"
                          : "bg-white border-gray-300 text-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {selectedSessions.includes(session.id) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Active
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Logout All Option */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-100">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Logout from all devices</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Sign out from every device including this one
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setLogoutAll(!logoutAll)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    logoutAll ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      logoutAll ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut || (!logoutAll && selectedSessions.length === 0)}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
              isLoggingOut || (!logoutAll && selectedSessions.length === 0)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {isLoggingOut ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="w-5 h-5" />
                {logoutAll
                  ? "Logout from All Devices"
                  : `Logout from ${selectedSessions.length} Device(s)`}
              </>
            )}
          </button>

          <button
            onClick={handleCancel}
            className="w-full py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Security Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
          <h4 className="font-semibold text-gray-900 mb-3">Security Tips</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Change your password regularly for better security
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Enable two-factor authentication for extra protection
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                Review active sessions monthly and logout from unfamiliar devices
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}