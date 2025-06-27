'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/products/blue-hoodie');
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isHydrated) return null; // Avoid mismatch during hydration

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/elegance-bg.jpg')" }} // make sure this is in /public
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">Elegance</h1>
        <h2 className="text-center text-gray-700 mb-6">where style meets embrace</h2>
        <h2 className="text-xl font-semibold text-center mb-4">Welcome!</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4 px-1 text-blue-600">
          <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
          <a href="/signup" className="hover:underline">New user? Sign Up</a>
        </div>
      </div>
    </div>
  );
}
