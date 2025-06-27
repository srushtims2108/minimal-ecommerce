"use client";

import { useSearchParams } from "next/navigation";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you for placing your order!</h1>
      <p className="text-lg mb-2 text-gray-800">Your order has been successfully placed.</p>
      <p className="text-lg text-gray-700">
        Your confirmation order has been shared to your{" "}
        <span className="font-semibold text-black">
          {email || "[email not available]"}
        </span>.
      </p>
    </div>
  );
}
