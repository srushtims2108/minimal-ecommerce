# 🛍️ Minimal E-Commerce

A minimal and modern full-stack e-commerce web application built with **Next.js App Router**, **TypeScript**, **MongoDB**, and **Tailwind CSS**. The app supports user authentication via Google, a dynamic cart, secure payment with **Razorpay**, and order confirmation emails via **Gmail SMTP**.

---

## 🚀 Features

- 🔐 Google OAuth login with NextAuth
- 🛍️ Product listing with add-to-cart functionality
- 💾 Cart stored in `localStorage`
- 💳 Razorpay integration for secure checkout
- 📧 Order confirmation email after successful payment
- 🧾 Order summary and success page
- 🔐 Protected purchase access for authenticated users
- 🐳 Fully Dockerized (MongoDB + App)

---

## 🧪 Tech Stack

- **Framework**: Next.js App Router (TypeScript)
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: NextAuth (Google)
- **Payments**: Razorpay
- **Email Service**: Nodemailer + Gmail SMTP
- **Containerization**: Docker + Docker Compose

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/minimal-ecommerce.git
cd minimal-ecommerce
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Copy the example file:

bash
Copy
Edit
cp .env.example .env
Fill in the values inside .env.

4. Run the app
bash
Copy
Edit
npm run dev
The app will be running at: http://localhost:3000

🐳 Run with Docker
Make sure Docker and Docker Compose are installed.

bash
Copy
Edit
docker-compose up --build
The app will be live on: http://localhost:3000

MongoDB runs in a separate container.

📁 Environment Variables
Create a .env file using the structure below:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/ecommerce

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

NEXT_PUBLIC_BASE_URL=http://localhost:3000

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
💡 Use a Gmail App Password instead of your main Gmail password.


📬 Support
For any queries or help, feel free to reach out:

📧 Email: elegance@gmail.com

📞 Phone: +91-9876XXXXXX