"use client";

import { useState } from "react";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Facebook, 
  Twitter, 
  Github,
  Chrome,
  Fingerprint,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  UserPlus,
  Key,
  Shield
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "google">("email");
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
      router.push("/");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Logging in with ${provider}...`);
    // Implement social login
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const loginMethods = [
    { id: "email", label: "Email", icon: <Mail className="w-5 h-5" /> },
    { id: "phone", label: "Phone", icon: <Smartphone className="w-5 h-5" /> },
    { id: "google", label: "Google", icon: <Chrome className="w-5 h-5" /> }
  ];

  const socialLogins = [
    { id: "google", label: "Google", icon: <Chrome className="w-5 h-5" />, color: "hover:bg-red-50 border-red-200" },
    { id: "facebook", label: "Facebook", icon: <Facebook className="w-5 h-5" />, color: "hover:bg-blue-50 border-blue-200" },
    { id: "twitter", label: "Twitter", icon: <Twitter className="w-5 h-5" />, color: "hover:bg-sky-50 border-sky-200" },
    { id: "github", label: "Github", icon: <Github className="w-5 h-5" />, color: "hover:bg-gray-100 border-gray-300" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 max-w-md mx-auto shadow-xl relative">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
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
              onClick={() => router.back()}
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-500">Sign in to your account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8">
        {/* Login Methods */}
        <div className="mb-8">
          <div className="flex gap-2 mb-6">
            {loginMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setLoginMethod(method.id as any)}
                className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  loginMethod === method.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {method.icon}
                <span className="text-sm font-medium">{method.label}</span>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email/Phone Input */}
            {loginMethod === "email" && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({...errors, email: undefined});
                    }}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>
            )}

            {loginMethod === "phone" && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll send you a verification code
                </p>
              </div>
            )}

            {loginMethod === "google" && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Chrome className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600">
                  Continue with your Google account
                </p>
              </div>
            )}

            {/* Password Input (only for email login) */}
            {loginMethod === "email" && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({...errors, password: undefined});
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </div>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {socialLogins.map((social) => (
            <button
              key={social.id}
              onClick={() => handleSocialLogin(social.label)}
              className={`py-3 border rounded-xl flex items-center justify-center ${social.color}`}
            >
              {social.icon}
            </button>
          ))}
        </div>

        {/* Biometric Login */}
        <div className="mb-8">
          <button className="w-full py-3.5 border-2 border-purple-200 text-purple-700 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-3">
            <Fingerprint className="w-5 h-5" />
            Use Biometric Login
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={handleSignUp}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign up now
            </button>
          </p>
        </div>

        {/* Security Features */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h4 className="font-semibold text-gray-900">Secure Login</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">End-to-end encryption</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">No password sharing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Regular security audits</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}