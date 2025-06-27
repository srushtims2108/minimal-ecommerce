import nodemailer from 'nodemailer';

export async function sendOrderConfirmationEmail(email: string, orderDetails: any) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail ID
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  const mailOptions = {
    from: `"Minimal E-Commerce" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Order Confirmation',
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <pre>${JSON.stringify(orderDetails, null, 2)}</pre>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent: ', info.response);
}
