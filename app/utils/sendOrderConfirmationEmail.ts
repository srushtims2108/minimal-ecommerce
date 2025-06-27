// app/utils/sendOrderConfirmationEmail.ts
import nodemailer from "nodemailer";


export async function sendOrderConfirmationEmail(userEmail: string, orderDetails: any) {
  try {
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
      from: `"Minimal E-commerce" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🛒 Order Confirmation - Thank you for your purchase!",
      html: `
        <h2>Hi there,</h2>
        <p>Thank you for your order! 🎉</p>
        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
        <p><strong>Amount:</strong> ₹${orderDetails.amount}</p>
        <p>We'll send you another email once your order is shipped.</p>
        <hr/>
        <p>Regards,<br/>Minimal E-commerce Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Order confirmation email sent!");
  } catch (error) {
    console.error("❌ Failed to send order confirmation email:", error);
  }
}

