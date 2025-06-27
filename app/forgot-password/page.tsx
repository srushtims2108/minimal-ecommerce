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
    <form onSubmit={handleReset} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="block mb-2 p-2 w-full border" />
      <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="New Password" required className="block mb-2 p-2 w-full border" />
      <button type="submit" className="w-full bg-yellow-500 text-white p-2">Reset</button>
    </form>
  );
}
