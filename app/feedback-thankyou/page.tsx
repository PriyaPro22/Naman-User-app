import Link from 'next/link'

export default function FeedbackThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Title - EXACT same spacing */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Thank You for Your
          <br />
          <br />
          Feedback!
        </h1>

        {/* Message - EXACT same text and spacing */}
        <div className="text-gray-600 text-lg mb-12 leading-relaxed">
          <p className="mb-4">
            Your insights help us power up our
            <br />
            services.
          </p>
          <p>
            We truly appreciate you taking
            <br />
            the time to rate your Bijli Wala.
          </p>
        </div>

        {/* Action Buttons - EXACT same styling */}
        <div className="space-y-4">
          <Link
            href="/services"
            className="block w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore More Services
          </Link>
          <Link
            href="/bookings"
            className="block w-full py-4 border-2 border-yellow-400 text-yellow-500 text-lg font-bold rounded-xl hover:bg-yellow-50 transition-colors"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    </div>
  )
}