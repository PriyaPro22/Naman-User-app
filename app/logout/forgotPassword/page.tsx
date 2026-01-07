"use client";

import { useState } from "react";
import { 
  Mail, 
  Smartphone, 
  Key, 
  CheckCircle, 
  ArrowLeft,
  Shield,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "newPassword">("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState<"email" | "sms">("email");

  const handleSendResetLink = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      alert("Reset link sent to your email!");
    }, 1500);
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Please enter the complete OTP");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("newPassword");
      alert("OTP verified successfully!");
    }, 1500);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successfully!");
      router.push("/login");
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

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
              <h1 className="text-2xl font-bold text-gray-900">
                {step === "email" && "Reset Password"}
                {step === "otp" && "Verify OTP"}
                {step === "newPassword" && "New Password"}
              </h1>
              <p className="text-sm text-gray-500">
                {step === "email" && "Get reset instructions"}
                {step === "otp" && "Enter verification code"}
                {step === "newPassword" && "Create new password"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "email" 
                ? "bg-blue-600 text-white" 
                : "bg-blue-100 text-blue-600"
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              step === "otp" || step === "newPassword" 
                ? "bg-blue-600" 
                : "bg-gray-300"
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "otp" 
                ? "bg-blue-600 text-white" 
                : step === "newPassword"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-400"
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${
              step === "newPassword" 
                ? "bg-blue-600" 
                : "bg-gray-300"
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === "newPassword" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-400"
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Enter Email/Phone */}
        {step === "email" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setMethod("email")}
                  className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-2 ${
                    method === "email"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-medium">Email</span>
                </button>
                <button
                  onClick={() => setMethod("sms")}
                  className={`flex-1 py-3 rounded-xl border flex flex-col items-center justify-center gap-2 ${
                    method === "sms"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm font-medium">SMS</span>
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {method === "email" ? "Email Address" : "Phone Number"}
                </label>
                <div className="relative">
                  {method === "email" ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  ) : (
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  )}
                  <input
                    type={method === "email" ? "email" : "tel"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={method === "email" ? "Enter your email" : "Enter your phone number"}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll send reset instructions to your {method === "email" ? "email" : "phone"}
                </p>
              </div>
            </div>

            <button
              onClick={handleSendResetLink}
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
                  Sending...
                </>
              ) : (
                <>
                  <Key className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {step === "otp" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enter Verification Code
              </h3>
              <p className="text-gray-600 mb-6">
                We've sent a 6-digit code to {method === "email" ? email : "your phone"}
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span>Code expires in 05:00</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("email")}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className={`flex-1 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Verify
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === "newPassword" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Create New Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Must be at least 8 characters with letters and numbers
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("otp")}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className={`flex-1 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Resetting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Reset Password
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}