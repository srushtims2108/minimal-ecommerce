'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords don't match!");

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Signup successful!');
      router.push('/');
    } else {
      alert(data.error || 'Signup failed.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="block mb-2 p-2 w-full border" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required className="block mb-2 p-2 w-full border" />
      <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" placeholder="Confirm Password" required className="block mb-2 p-2 w-full border" />
      <button type="submit" className="w-full bg-green-500 text-white p-2">Sign Up</button>
    </form>
  );
}
