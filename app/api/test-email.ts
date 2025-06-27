// /app/api/test-email.ts
import { sendOrderConfirmationEmail } from "@/app/utils/sendOrderConfirmationEmail";

export async function GET() {
  try {
    await sendOrderConfirmationEmail("yourmail@gmail.com", {
      orderId: "TEST123",
      amount: 199,
    });
    return new Response("Email sent");
  } catch (err) {
    return new Response("Error sending email", { status: 500 });
  }
}
