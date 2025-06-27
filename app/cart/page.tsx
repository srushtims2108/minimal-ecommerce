'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  size: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const updateLocalStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: string, size: string) => {
    const updated = cart.filter(item => !(item.id === id && item.size === size));
    updateLocalStorage(updated);
  };

  const changeQuantity = (id: string, size: string, diff: number) => {
    const updated = cart.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, item.quantity + diff) }
        : item
    );
    updateLocalStorage(updated);
  };

  const changeSize = (id: string, currentSize: string, newSize: string) => {
    const exists = cart.find(item => item.id === id && item.size === newSize);
    if (exists) {
      alert("This size is already in the cart. Please update quantity instead.");
      return;
    }

    const updated = cart.map(item =>
      item.id === id && item.size === currentSize
        ? { ...item, size: newSize }
        : item
    );
    updateLocalStorage(updated);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalOriginal = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);

  const handlePayment = async () => {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice + 20 }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: 'Minimal E-Commerce',
      description: 'Order Payment',
      handler: async function (response: any) {
        alert('Payment Successful!');
        console.log('Payment Details:', response);

        // ✅ Send confirmation email
        await fetch("/api/order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: userEmail,
            orderId: data.id,
            amount: data.amount / 100,
          }),
        });

        // ✅ Redirect to confirmation page
        window.location.href = "/order-confirmation";
      },
      prefill: {
        email: userEmail,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* CART ITEMS */}
          <div className="flex-1 space-y-6">
            {cart.map(item => (
              <div key={`${item.id}-${item.size}`} className="bg-white p-4 rounded-md shadow flex gap-4 items-center">
                <div className="w-24 h-24 relative">
                  <Image src={item.image} alt={item.name} fill className="object-contain" />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="font-bold">{item.name}</h2>
                  <div className="flex items-center gap-4">
                    <select
                      value={item.size}
                      onChange={e => changeSize(item.id, item.size, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQuantity(item.id, item.size, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, item.size, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    ₹{item.price} <span className="line-through text-gray-400 ml-2">₹{item.originalPrice}</span>
                    <span className="text-red-500 ml-2">{item.discount}% OFF</span>
                  </p>
                </div>
                <button onClick={() => removeItem(item.id, item.size)} className="text-xl text-red-500 font-bold">✕</button>
              </div>
            ))}
          </div>

          {/* BILLING */}
          <div className="w-full lg:w-80 bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Price Details</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{totalOriginal}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>- ₹{totalOriginal - totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹20</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-black text-base">
                <span>Total Amount</span>
                <span>₹{totalPrice + 20}</span>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
