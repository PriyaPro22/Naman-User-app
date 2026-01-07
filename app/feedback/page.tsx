"use client";

import { useState } from 'react';
import { ArrowLeft, Star, MessageCircle, ThumbsUp, Home, Grid3x3, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [specificRatings, setSpecificRatings] = useState({
    professionalism: 5,
    quality: 5,
    timeliness: 5,
  });

  const handleSpecificRating = (category: keyof typeof specificRatings, value: number) => {
    setSpecificRatings(prev => ({ ...prev, [category]: value }));
  };

  const ratingLabels = [
    'Very Poor',
    'Poor',
    'Average',
    'Good',
    'Very Good',
    'Excellent'
  ];

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">Feedback</span>
          </button>
        </div>
      </header>

      <div className="px-4 mt-8">
        <div className="bg-white rounded-xl p-5 shadow-soft">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-dark mb-2">How Was Your Service?</h1>
            <p className="text-text-gray">Your feedback helps us improve.</p>
          </div>

          {/* Star Rating */}
          <div className="text-center mb-6">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="text-4xl focus:outline-none"
                >
                  <Star
                    size={48}
                    className={star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
            <div className="text-xl font-bold text-text-dark mb-2">
              {ratingLabels[rating - 1]}
            </div>
            <div className="text-text-gray text-sm">
              Tap stars to rate your experience
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="mb-6">
            <label className="block text-lg font-bold text-text-dark mb-3">
              Share Your Experience
            </label>
            <p className="text-text-gray text-sm mb-3">
              Tell us about your experience with the technician...
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Type your feedback here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-primary focus:border-yellow-primary"
              maxLength={250}
            />
            <div className="text-right text-sm text-text-gray mt-2">
              {feedback.length}/250
            </div>
          </div>

          {/* Specific Ratings */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-text-dark mb-4">Rate Specifics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-text-dark">Technician Professionalism</span>
                  <span className="text-sm font-bold text-yellow-primary">
                    {specificRatings.professionalism}/5
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleSpecificRating('professionalism', star)}
                      className="text-2xl focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={star <= specificRatings.professionalism ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-text-dark">Service Quality</span>
                  <span className="text-sm font-bold text-yellow-primary">
                    {specificRatings.quality}/5
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleSpecificRating('quality', star)}
                      className="text-2xl focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={star <= specificRatings.quality ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-text-dark">Timeliness</span>
                  <span className="text-sm font-bold text-yellow-primary">
                    {specificRatings.timeliness}/5
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleSpecificRating('timeliness', star)}
                      className="text-2xl focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={star <= specificRatings.timeliness ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Link href="/my-bookings">
            <button className="w-full bg-yellow-primary text-text-dark font-bold py-4 rounded-xl hover:bg-yellow-dark shadow-md flex items-center justify-center gap-2 text-lg">
              Submit Feedback
              <ArrowRight size={24} />
            </button>
          </Link>

          {/* Skip Option */}
          <button
            onClick={() => router.push('/my-bookings')}
            className="w-full mt-4 py-3 text-text-gray font-medium hover:text-text-dark"
          >
            Skip for now
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 shadow-hard">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Home size={24} />
            <span className="text-xs mt-1 font-semibold">Home</span>
          </Link>
          
          <Link href="/services" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <Grid3x3 size={24} />
            <span className="text-xs mt-1 font-semibold">Services</span>
          </Link>
          
          <Link href="/payment" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </Link>
          
          <button className="flex flex-col items-center text-yellow-primary">
            <User size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

import { ArrowRight } from 'lucide-react';