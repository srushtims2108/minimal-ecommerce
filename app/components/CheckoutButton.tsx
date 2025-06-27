"use client";

import { useSession } from "next-auth/react";

export default function CheckoutButton({ amount }: { amount: number }) {
  const { data: session, status } = useSession();

  const makePayment = async () => {
    if (!session?.user?.email) {
      alert("Please log in to continue with payment.");
      return;
    }

    // 1. Create Razorpay Order
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    // 2. Razorpay Options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: order.amount,
      currency: "INR",
      name: "Minimal E-Commerce",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response: any) {
        const email = session?.user?.email;
        console.log("✅ User email:", email);

        // 3. Send email confirmation request
        await fetch("/api/razorpay/success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            order_id: response.razorpay_order_id,
            amount: order.amount,
          }),
        });

        // 4. Redirect to confirmation page with email
        window.location.href = `/order-confirmation?email=${encodeURIComponent(email || "")}`;
      },

      theme: { color: "#3399cc" },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  // Wait for session to load
  if (status === "loading") return null;

  return (
    <button onClick={makePayment} className="bg-blue-600 text-white p-2 rounded">
      Pay ₹{amount}
    </button>
  );
}
