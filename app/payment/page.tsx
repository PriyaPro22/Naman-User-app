"use client";

import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, Lock, Home, Grid3x3, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('upi');

  return (
    <div className="min-h-screen bg-gray-bg pb-24">
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={24} />
            <span className="text-lg font-bold text-text-dark">Payment</span>
          </button>
        </div>
      </header>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl p-5 shadow-soft mb-4">
          <h2 className="text-lg font-bold text-text-dark mb-4">BOOKING SUMMARY</h2>
          <div className="flex justify-between items-center mb-3">
            <span className="text-text-gray">AC Repair - Standard</span>
            <div className="text-right">
              <span className="text-lg font-bold">₹499</span>
              <span className="text-text-gray line-through text-sm ml-2">₹650</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-soft">
          <h2 className="text-lg font-bold text-text-dark mb-4">Payment Options</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`w-full p-3 border rounded-lg flex items-center justify-between ${
                paymentMethod === 'upi' ? 'border-yellow-primary bg-yellow-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-blue-icon" />
                <div>
                  <div className="font-medium text-text-dark">UPI</div>
                  <div className="text-xs text-text-gray">Google Pay, PhonePe, Paytm</div>
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'upi' ? 'bg-yellow-primary border-yellow-primary' : 'border-gray-300'}`}></div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-3 border rounded-lg flex items-center justify-between ${
                paymentMethod === 'card' ? 'border-yellow-primary bg-yellow-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-blue-icon" />
                <div className="font-medium text-text-dark">Credit / Debit Card</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'card' ? 'bg-yellow-primary border-yellow-primary' : 'border-gray-300'}`}></div>
            </button>

            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`w-full p-3 border rounded-lg flex items-center justify-between ${
                paymentMethod === 'netbanking' ? 'border-yellow-primary bg-yellow-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building size={20} className="text-blue-icon" />
                <div className="font-medium text-text-dark">Net Banking</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'netbanking' ? 'bg-yellow-primary border-yellow-primary' : 'border-gray-300'}`}></div>
            </button>

            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`w-full p-3 border rounded-lg flex items-center justify-between ${
                paymentMethod === 'wallet' ? 'border-yellow-primary bg-yellow-50' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet size={20} className="text-blue-icon" />
                <div className="font-medium text-text-dark">Wallets</div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'wallet' ? 'bg-yellow-primary border-yellow-primary' : 'border-gray-300'}`}></div>
            </button>
          </div>

          {paymentMethod === 'card' && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg">
              <div className="mb-3">
                <label className="block text-sm font-medium text-text-gray mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-gray mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input type="checkbox" id="saveCard" className="w-4 h-4" />
                <label htmlFor="saveCard" className="text-sm text-text-gray">
                  Securely save card for future payments
                </label>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total Payable</span>
              <span className="text-2xl font-bold">₹499</span>
            </div>
          </div>

          <Link href="/payment-success">
            <button className="w-full bg-yellow-primary text-text-dark font-bold py-3 rounded-xl hover:bg-yellow-dark shadow-md mt-6 flex items-center justify-center gap-2">
              Pay Now
              <ArrowRight size={20} />
            </button>
          </Link>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-text-gray">
            <Lock size={12} />
            <span>100% Safe & Secure Payment</span>
          </div>
          <p className="text-center text-xs text-text-gray mt-1">Encrypted with 256-bit SSL technology</p>
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
          
          <button className="flex flex-col items-center text-yellow-primary">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1 font-semibold">Cart</span>
          </button>
          
          <Link href="/my-bookings" className="flex flex-col items-center text-text-gray hover:text-yellow-primary">
            <User size={24} />
            <span className="text-xs mt-1 font-semibold">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';