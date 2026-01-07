"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Plus, MapPin, Home, Building, 
  Navigation, Edit2, Trash2, Check, X,
  Star, Loader2
} from 'lucide-react';

export default function AddressesPage() {
  const router = useRouter();
  
  // Addresses state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Main Street, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      phone: "+91 9876543210",
      isDefault: true,
      type: "home"
    },
    {
      id: 2,
      name: "Office",
      address: "Corporate Park, Tower B, 5th Floor",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      phone: "+91 9876543211",
      isDefault: false,
      type: "office"
    },
    {
      id: 3,
      name: "Parents House",
      address: "456 Park Street, Near City Mall",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "+91 9876543212",
      isDefault: false,
      type: "home"
    }
  ]);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  
  // New address form
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    type: "home"
  });

  // Handle set default address
  const handleSetDefault = (id: number) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  // Handle delete address
  const handleDeleteAddress = (id: number) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const addressToDelete = addresses.find(addr => addr.id === id);
      
      // If deleting default address, set another as default
      if (addressToDelete?.isDefault) {
        const otherAddresses = addresses.filter(addr => addr.id !== id);
        if (otherAddresses.length > 0) {
          otherAddresses[0].isDefault = true;
          setAddresses(otherAddresses);
        } else {
          setAddresses([]);
        }
      } else {
        setAddresses(prev => prev.filter(addr => addr.id !== id));
      }
    }
  };

  // Handle edit address
  const handleEditAddress = (id: number) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      setEditingId(id);
      setEditForm({ ...address });
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editForm.name || !editForm.address || !editForm.city || !editForm.pincode) {
      alert("Please fill all required fields");
      return;
    }

    setAddresses(prev => prev.map(addr => 
      addr.id === editingId ? { ...editForm } : addr
    ));
    setEditingId(null);
    setEditForm(null);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  // Handle add new address
  const handleAddNewAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city || !newAddress.pincode) {
      alert("Please fill all required fields");
      return;
    }

    const newId = Math.max(...addresses.map(addr => addr.id), 0) + 1;
    const newAddr = {
      ...newAddress,
      id: newId,
      isDefault: addresses.length === 0
    };

    setAddresses(prev => [...prev, newAddr]);
    setIsAddingNew(false);
    setNewAddress({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      type: "home"
    });
  };

  // Handle use current location
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsFetchingLocation(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Using a CORS-friendly reverse geocoding service
      // Option 1: Use a proxy or direct API that supports CORS
      // Option 2: Use a different service
      
      // Here's a working alternative using LocationIQ (you need an API key)
      // For demo purposes, we'll use mock data
      
      // Mock location data for demonstration
      const mockLocationData = {
        address: {
          road: "MG Road",
          suburb: "Andheri West",
          city: "Mumbai",
          state: "Maharashtra",
          postcode: "400053",
          country: "India"
        }
      };

      // In production, you would use a real geocoding service like:
      // - LocationIQ (requires API key)
      // - Google Maps Geocoding API (requires API key)
      // - Here Maps Geocoding API (requires API key)
      
      // For now, using mock data
      setTimeout(() => {
        const addr = mockLocationData.address;
        const addressParts = [];
        if (addr.road) addressParts.push(addr.road);
        if (addr.suburb) addressParts.push(addr.suburb);
        
        const addressText = addressParts.join(", ");
        
        setNewAddress(prev => ({
          ...prev,
          address: addressText || `Near ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          city: addr.city || "Mumbai",
          state: addr.state || "Maharashtra",
          pincode: addr.postcode || "400053"
        }));
        
        setIsFetchingLocation(false);
        
        // Show success message
        alert("Location fetched successfully! Please verify the address details.");
      }, 1000);

      // Alternatively, you can show coordinates directly
      // setNewAddress(prev => ({
      //   ...prev,
      //   address: `Near coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
      //   city: "Detected Location",
      //   state: "",
      //   pincode: ""
      // }));
      
    } catch (error: any) {
      console.error('Error getting location:', error);
      setIsFetchingLocation(false);
      
      let errorMessage = "Unable to fetch location.";
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location permission denied. Please enable location services in your browser settings.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "Location request timed out.";
          break;
      }
      
      alert(errorMessage);
    }
  };

  // Handle use current location from main button
  const handleUseCurrentLocationFromMain = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsFetchingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // For main button, create a new address with coordinates
        const newId = Math.max(...addresses.map(addr => addr.id), 0) + 1;
        const newAddr = {
          id: newId,
          name: "Current Location",
          address: `Location detected at: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          city: "Current Location",
          state: "",
          pincode: "000000",
          phone: "",
          isDefault: false,
          type: "home"
        };
        
        setAddresses(prev => [...prev, newAddr]);
        setIsFetchingLocation(false);
        
        alert("Current location address added!");
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsFetchingLocation(false);
        alert("Unable to access your location. Please enable location services.");
      }
    );
  };

  // Get address icon
  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={20} className="text-amber-600" />;
      case 'office':
        return <Building size={20} className="text-blue-600" />;
      default:
        return <MapPin size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pb-24">
      {/* Header */}
      <header className="bg-amber-400 sticky top-0 z-40 shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-bold">My Addresses</span>
            </button>
            
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-3 py-1.5 text-sm font-medium bg-white text-amber-600 rounded-lg hover:bg-amber-50 flex items-center shadow-sm"
            >
              <Plus size={16} className="mr-1" />
              Add New
            </button>
          </div>
        </div>
      </header>

      {/* Add New Address Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Add New Address</h2>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Address Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['home', 'office'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewAddress(prev => ({ ...prev, type }))}
                      className={`p-3 rounded-lg border flex items-center justify-center gap-2 ${
                        newAddress.type === type
                          ? 'border-amber-400 bg-amber-50 text-amber-700'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {type === 'home' ? <Home size={18} /> : <Building size={18} />}
                      <span className="capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Home, Office"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complete Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  placeholder="House no., Building, Street, Area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                />
              </div>

              {/* Use Current Location Button */}
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isFetchingLocation}
                className="w-full py-2.5 border border-amber-400 text-amber-600 rounded-lg hover:bg-amber-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetchingLocation ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Navigation size={18} />
                    Use Current Location
                  </>
                )}
              </button>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder="Pincode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNewAddress}
                  className="flex-1 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Empty State */}
        {addresses.length === 0 && !isAddingNew && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={40} className="text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Addresses Added</h3>
            <p className="text-gray-600 mb-6">Add your first address to get started</p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium"
            >
              <Plus size={18} className="inline mr-2" />
              Add Address
            </button>
          </div>
        )}

        {/* Addresses List */}
        {addresses.length > 0 && (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Address Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      {getAddressIcon(address.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{address.name}</h3>
                      {address.isDefault && (
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="p-1.5 hover:bg-amber-50 rounded-lg text-amber-600"
                        title="Set as default"
                      >
                        <Star size={16} />
                      </button>
                    )}
                    
                    {editingId !== address.id && (
                      <>
                        <button
                          onClick={() => handleEditAddress(address.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                          title="Edit address"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600"
                          title="Delete address"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Address Details */}
                <div className="p-4">
                  {editingId === address.id ? (
                    // Edit Form
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm?.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                        placeholder="Address Name"
                      />
                      <textarea
                        value={editForm?.address || ''}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                        placeholder="Complete Address"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editForm?.city || ''}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          value={editForm?.pincode || ''}
                          onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                          placeholder="Pincode"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <Check size={16} className="inline mr-1" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Address
                    <>
                      <p className="text-gray-700 mb-3">{address.address}</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{address.city}, {address.state} - {address.pincode}</p>
                        <p>{address.phone}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Current Location Button */}
        {addresses.length > 0 && (
          <div className="mt-6">
            <button
              onClick={handleUseCurrentLocationFromMain}
              disabled={isFetchingLocation}
              className="w-full py-3 border-2 border-dashed border-amber-300 text-amber-600 rounded-xl hover:bg-amber-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetchingLocation ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation size={20} />
                  Add Current Location Address
                </>
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Your location will be used for accurate service delivery
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="font-bold text-amber-800 mb-2">Address Tips:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Add landmark for easy identification</li>
            <li>• Keep your phone number updated</li>
            <li>• Set your most used address as default</li>
            <li>• Update address if you move to a new location</li>
          </ul>
        </div>
      </div>
    </div>
  );
}