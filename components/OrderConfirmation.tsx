import React from 'react'

const OrderConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full flex flex-col items-center">
        <svg className="w-16 h-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2l4-4" stroke="currentColor" />
        </svg>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Thank you for your order!</h1>
        <p className="text-gray-700 text-center mb-6">Your order has been placed successfully. We’ve sent a confirmation email with your order details. You’ll receive another email when your items ship.</p>
        <div className="w-full flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Order Number:</span>
            <span className="font-semibold">#123456</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Estimated Delivery:</span>
            <span className="font-semibold">3-5 business days</span>
          </div>
        </div>
        <a href="/" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition">Continue Shopping</a>
      </div>
    </div>
  )
}

export default OrderConfirmation
