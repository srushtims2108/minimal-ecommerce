// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { amount } = body;

  const options = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
