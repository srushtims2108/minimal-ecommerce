import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: 'User exists' }, { status: 400 });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ email, password: hash });

    return NextResponse.json({ message: 'Created' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
