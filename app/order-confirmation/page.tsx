"use client";

import { useSearchParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: 'url("/elegance-bg.jpg")' }}
    >
      <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">
          🎉 Thank you for your order!
        </h1>

        <p className="text-lg text-gray-800 mb-2">
          Your order with <span className="italic font-semibold text-blue-700">Elegance</span> has been placed.
        </p>

        <p className="text-md text-gray-700 mb-1">
          We’re getting it ready for you.
        </p>

        <p className="text-md text-gray-700 mt-4">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  );
}
