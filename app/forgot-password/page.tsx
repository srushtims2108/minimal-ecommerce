'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Password updated!');
      router.push('/');
    } else {
      alert(data.error || 'Reset failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/elegance-bg.jpg')" }}
    >
      <form onSubmit={handleReset} className="p-6 max-w-md w-full bg-white/90 backdrop-blur rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="block mb-2 p-2 w-full border rounded"
        />
        <input
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          type="password"
          placeholder="New Password"
          required
          className="block mb-4 p-2 w-full border rounded"
        />
        <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition">
          Reset
        </button>
      </form>
    </div>
  );
}
