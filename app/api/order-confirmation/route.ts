import { sendOrderConfirmationEmail } from "@/app/utils/sendOrderConfirmationEmail";


export async function POST(req: Request) {
  const body = await req.json();

  const userEmail = body.to;
  const orderDetails = {
    orderId: body.orderId,
    amount: body.amount,
  };

  try {
    await sendOrderConfirmationEmail(userEmail, orderDetails);
    return new Response(JSON.stringify({ message: "Email sent" }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
  }
}
