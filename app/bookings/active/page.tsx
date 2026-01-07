'use client'

export default function ActiveBookingLivePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-4">
        <div className="text-sm font-medium">NAVIGATING</div>
        <div className="text-lg font-bold mt-1">Technician is on the way</div>
        <div className="text-sm opacity-90 mt-1">Estimated arrival in 15 minutes</div>
      </div>

      <div className="p-4">
        {/* Technician Card */}
        <div className="border border-gray-300 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
              RK
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">Rajesh Kumar</h3>
              <div className="text-yellow-500">★ 4.8 (124)</div>
            </div>
          </div>

          {/* ETA & Distance */}
          <div className="flex justify-between items-center mb-6 p-3 bg-yellow-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">ETA</div>
              <div className="text-xl font-bold text-gray-800">15 min</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Distance</div>
              <div className="text-xl font-bold text-gray-800">5 KM</div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 py-3 bg-yellow-500 text-white rounded-lg font-bold">
              Call
            </button>
            <button className="flex-1 py-3 border border-yellow-500 text-yellow-500 rounded-lg font-bold">
              Chat
            </button>
          </div>
        </div>

        {/* Booking Details */}
        <div className="border border-gray-300 rounded-xl p-4">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Details</h3>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Service Type</div>
              <div className="font-medium text-gray-800">AC Repair & Service</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Booking ID</div>
              <div className="font-medium text-gray-800">#BWA-9283</div>
            </div>

            <div>
              <div className="text-sm text-gray-600">Details</div>
              <div className="font-medium text-gray-800">Split AC • General Service</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-medium text-gray-800">Oct 24</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Time</div>
                <div className="font-medium text-gray-800">02:00 PM</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Payment</div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Paid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}