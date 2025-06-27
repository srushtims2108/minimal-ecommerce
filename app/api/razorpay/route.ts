// app/api/razorpay/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { amount } = await req.json();
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });
    return NextResponse.json(order);
  } catch (e) {
    console.error('Razorpay error:', e);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
