"use client";

import { useState } from "react";
import {
  Lock,
  Shield,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  ChevronLeft,
  AlertCircle,
  Clock,
  Bell,
  Mail,
  Smartphone,
  QrCode,
  RefreshCw,
  Download,
  Trash2
} from "lucide-react";

const securityFeatures = [
  {
    id: "password",
    title: "Password",
    description: "Last changed 30 days ago",
    status: "strong",
    icon: <Key className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Authenticator app enabled",
    status: "enabled",
    icon: <Shield className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "biometric",
    title: "Biometric Login",
    description: "Fingerprint/Face ID",
    status: "enabled",
    icon: <Fingerprint className="w-6 h-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "sessions",
    title: "Active Sessions",
    description: "3 devices connected",
    status: "warning",
    icon: <Smartphone className="w-6 h-6" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
];

const recentActivities = [
  { id: 1, action: "Password changed", device: "iPhone 12 Pro", location: "Delhi, IN", time: "2 hours ago", status: "success" },
  { id: 2, action: "New login", device: "MacBook Pro", location: "Mumbai, IN", time: "1 day ago", status: "success" },
  { id: 3, action: "Login attempt blocked", device: "Unknown", location: "Beijing, CN", time: "3 days ago", status: "blocked" },
  { id: 4, action: "2FA enabled", device: "iPhone 12 Pro", location: "Delhi, IN", time: "1 week ago", status: "success" }
];

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Device Info */}
        <div className="bg-gray-900 text-white text-xs px-4 py-2">
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
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Security</h1>
                <p className="text-sm text-gray-500">Protect your account</p>
              </div>
            </div>
            
            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
              <Shield className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Security Score */}
      <div className="px-4 pt-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Security Score</h2>
              <p className="text-blue-100">Your account is well protected</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">85%</div>
              <p className="text-sm text-blue-100">Excellent</p>
            </div>
          </div>
          
          <div className="h-2 bg-blue-500 bg-opacity-50 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {securityFeatures.map((feature) => (
            <div key={feature.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${feature.bgColor} ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="font-medium text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              <div className="flex items-center gap-1 mt-2">
                {feature.status === "strong" && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">Strong</span>
                  </>
                )}
                {feature.status === "enabled" && (
                  <>
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-blue-600">Enabled</span>
                  </>
                )}
                {feature.status === "warning" && (
                  <>
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-yellow-600">Review</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-1 block">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with letters and numbers</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
            
            <button
              onClick={handleChangePassword}
              className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add extra security layer</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Fingerprint className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Biometric Login</p>
                  <p className="text-sm text-gray-600">Use fingerprint/face ID</p>
                </div>
              </div>
              <button
                onClick={() => setBiometricEnabled(!biometricEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${biometricEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${biometricEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-50">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Login Alerts</p>
                  <p className="text-sm text-gray-600">Get notified for new logins</p>
                </div>
              </div>
              <button
                onClick={() => setLoginAlerts(!loginAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${loginAlerts ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${loginAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <button className="w-full py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              Setup QR Code Login
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 py-4 pb-24">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${activity.status === "success" ? "bg-green-100" : activity.status === "blocked" ? "bg-red-100" : "bg-yellow-100"}`}>
                  {activity.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : activity.status === "blocked" ? (
                    <XCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Smartphone className="w-3 h-3 text-gray-400" />
                    <p className="text-sm text-gray-600">{activity.device}</p>
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-600">{activity.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export Logs
            </button>
            <button className="py-2.5 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}