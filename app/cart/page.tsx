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

const Toast = ({ message }: { message: string }) => (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
    {message}
  </div>
);

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
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
      alert("This size is already in the cart.");
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
      name: 'Elegance',
      description: 'Order Payment',
      handler: async function () {
        setToastMessage("Payment successful! Redirecting...");
        await fetch("/api/order-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: userEmail,
            orderId: data.id,
            amount: data.amount / 100,
          }),
        });
        setTimeout(() => {
          window.location.href = "/order-confirmation";
        }, 2000);
      },
      prefill: { email: userEmail },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="space-y-6">
          {/* Cart Items List */}
          {cart.map(item => (
            <div key={`${item.id}-${item.size}`} className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row items-center gap-6">
              <div className="w-28 h-28 relative">
                <Image src={item.image} alt={item.name} fill className="object-contain rounded" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-2">
                  <select
                    value={item.size}
                    onChange={e => changeSize(item.id, item.size, e.target.value)}
                    className="border px-3 py-1 rounded text-base"
                  >
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQuantity(item.id, item.size, -1)} className="px-3 py-1 text-lg bg-gray-200 rounded">−</button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, item.size, 1)} className="px-3 py-1 text-lg bg-gray-200 rounded">+</button>
                  </div>
                </div>
                <p className="text-gray-700 text-base mt-2">
                  ₹{item.price}
                  <span className="line-through text-gray-400 ml-2">₹{item.originalPrice}</span>
                  <span className="text-red-500 ml-2">{item.discount}% OFF</span>
                </p>
              </div>
              <button onClick={() => removeItem(item.id, item.size)} className="text-2xl text-red-500 font-bold">×</button>
            </div>
          ))}

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Price Details</h2>
            <div className="space-y-4 text-base text-gray-700">
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
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>₹{totalPrice + 20}</span>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-green-600 text-white text-lg py-3 rounded hover:bg-green-700 transition"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      )}

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
