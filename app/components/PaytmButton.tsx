'use client';
import { useRouter } from 'next/navigation';

interface PaytmButtonProps {
  orderId: string;
  amount: number;
  customerId: string;
}

export default function PaytmButton({ orderId, amount, customerId }: PaytmButtonProps) {
  const handlePay = async () => {
    const res = await fetch('/api/paytm/initiate', {
      method: 'POST',
      body: JSON.stringify({ orderId, amount, customerId }),
    });

    const { params } = await res.json();

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = process.env.NEXT_PUBLIC_PAYTM_TXN_URL!;

    Object.entries(params).forEach(([key, val]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = val as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button onClick={handlePay} className="bg-blue-600 text-white px-4 py-2 rounded">
      Pay ₹{amount}
    </button>
  );
}
