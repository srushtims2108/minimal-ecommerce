// app/utils/sendOrderConfirmationEmail.ts
import nodemailer from "nodemailer";

interface OrderDetails {
  orderId: string;
  amount: number;
}

export async function sendOrderConfirmationEmail(
  userEmail: string,
  orderDetails: OrderDetails
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Elegance" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "🛍️ Thank you for your order with Elegance!",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #1a202c;">Hi there,</h2>
        <p>✨ <strong>Thank you so much for shopping with <span style="color: #3b82f6;">Elegance</span>.</strong></p>

        <p>Your order has been successfully placed and is being processed.</p>

        <p>
          <strong>Order ID:</strong> ${orderDetails.orderId}<br/>
          <strong>Amount Paid:</strong> ₹${orderDetails.amount}
        </p>

        <p>
          Your items will be carefully packed and shipped to you within <strong>7–8 working days</strong>.
          We’ll notify you again once it’s on the way!
        </p>

        <hr style="margin: 20px 0;" />

        <p style="font-size: 0.95rem; color: #4b5563;">
          📞 If you have any questions or concerns about your order, feel free to reach out to us at
          <strong>+91-98765-43210</strong> or drop us an email at
          <a href="mailto:elegance@gmail.com">elegance@gmail.com</a>.
        </p>

        <p style="margin-top: 30px;">Warm regards,<br/>
        <strong>The Elegance Team</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Order confirmation email sent to", userEmail);
}
