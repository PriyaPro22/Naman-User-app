"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Camera, User, Phone, Mail, 
  MapPin, Calendar, Edit2, Save, X,
  Shield, Eye, EyeOff, CheckCircle
} from 'lucide-react';

export default function EditProfilePage() {
  const router = useRouter();
  
  // User state
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    dateOfBirth: "1990-05-15",
    gender: "male"
  });

  // Editable fields state
  const [editableUser, setEditableUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Profile image state
  const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=John");
  const [isUploading, setIsUploading] = useState(false);

  // Initialize editable user
  useEffect(() => {
    setEditableUser(user);
  }, [user]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {

  setEditableUser(prev => ({
    ...prev,
    [field]: value
  }));
};


  // Handle save profile
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Validate passwords if changed
    if (password && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setIsSaving(false);
      return;
    }
    
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setIsSaving(false);
      return;
    }
    
    setPasswordError("");
    
    // Simulate API call
    setTimeout(() => {
      setUser(editableUser);
      setIsEditing(false);
      setIsSaving(false);
      
      // Clear password fields
      setPassword("");
      setConfirmPassword("");
      
      alert("Profile updated successfully!");
    }, 1000);
  };

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("Image size should be less than 5MB");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 500);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditableUser(user);
    setIsEditing(false);
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-amber-400 sticky top-0 z-40 shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-bold">Edit Profile</span>
            </button>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 text-sm font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <X size={16} className="inline mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="px-3 py-1.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <span className="animate-spin mr-1">⟳</span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="inline mr-1" />
                        Save
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 text-sm font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center"
                >
                  <Edit2 size={16} className="inline mr-1" />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Image Section */}
      <div className="px-4 py-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-amber-500 text-white p-2 rounded-full cursor-pointer hover:bg-amber-600 shadow-lg">
                <Camera size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="animate-spin text-white">⟳</div>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mt-4">{user.name}</h1>
          <p className="text-gray-600 mt-1">Joined January 2024</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Personal Information Section */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <User size={20} className="mr-2 text-amber-500" />
              Personal Information
            </h2>
            
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {user.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail size={14} className="mr-1" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editableUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {user.email}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone size={14} className="mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editableUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {user.phone}
                  </div>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin size={14} className="mr-1" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editableUser.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                    {user.address}
                  </div>
                )}
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editableUser.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                      {user.dateOfBirth}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={editableUser.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 capitalize">
                      {user.gender}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Security Section - Only shown in edit mode */}
          {isEditing && (
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Shield size={20} className="mr-2 text-amber-500" />
                Security Settings
              </h2>
              
              <div className="space-y-4">
                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password (Leave blank to keep current)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent pr-10`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <h3 className="text-sm font-bold text-amber-800 mb-2">Password Requirements:</h3>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li className={`flex items-center ${password.length >= 6 ? 'text-green-600' : ''}`}>
                      <CheckCircle size={12} className="mr-1" />
                      At least 6 characters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Include uppercase & lowercase letters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      Include at least one number
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Account Verification Status */}
          <div className="p-4 bg-gray-50">
            <h3 className="text-md font-bold text-gray-900 mb-2">Account Verification</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email</span>
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <CheckCircle size={14} className="mr-1" />
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Phone</span>
                <span className="text-sm font-medium text-green-600 flex items-center">
                  <CheckCircle size={14} className="mr-1" />
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Identity</span>
                <span className="text-sm font-medium text-amber-600">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                // Handle account deletion
                alert("Account deletion requested. A confirmation email has been sent.");
              }
            }}
            className="w-full py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            Delete Account
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            This will permanently delete your account and all associated data.
          </p>
        </div>
      </div>
    </div>
  );
}