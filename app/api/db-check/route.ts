import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ connected: true });
  } catch {
    return NextResponse.json({ connected: false }, { status: 500 });
  }
}
