# 🛍️ Minimal E-Commerce

A modern full-stack e-commerce web application built with **Next.js App Router**, **TypeScript**, **MongoDB**, and **Tailwind CSS**. The app features secure **Google OAuth login**, a dynamic cart system, **Razorpay** payment gateway, and order confirmation emails via **Gmail SMTP**.

---

## 🚀 Features

- 🔐 Google OAuth 2.0 authentication via NextAuth
- 🛒 Add-to-cart with quantity and size options
- 💾 Cart stored in `localStorage`
- 💳 Razorpay integration for secure payments
- 📧 Email confirmation after successful orders
- ✅ Protected product pages (auth-only access)
- 🐳 Dockerized setup for easy deployment
- 🎨 Clean UI with Tailwind CSS

---

## 🧪 Tech Stack

| Layer              | Tech                          |
|-------------------|-------------------------------|
| **Frontend**       | React, Next.js (App Router)   |
| **Styling**        | Tailwind CSS                  |
| **Backend**        | Node.js, Next.js API Routes   |
| **Database**       | MongoDB                       |
| **Authentication** | NextAuth + Google OAuth       |
| **Payments**       | Razorpay                      |
| **Email**          | Nodemailer + Gmail SMTP       |
| **Containerization** | Docker + Docker Compose     |

---

## ⚙️ Local Development

 ✅ 1. Clone the repository

git clone https://github.com/srushtims2108/minimal-ecommerce.git
cd minimal-ecommerce


✅ 2. Install dependencies

npm install


✅ 3. Configure environment variables

Copy the example file:
cp .env.example .env
Then fill in your actual credentials inside the .env file.


✅ 4. Run the app (development mode)

npm run dev
App will run at: http://localhost:3000


🐳 Docker Setup (Production-ready)

Ensure Docker and Docker Compose are installed.


✅ a. Run both MongoDB and the app

docker-compose up --build

This will:

Spin up a MongoDB container

Run the Next.js app in a container

Auto-connect the database via environment variables



🛠️ Environment Variables

Create a .env file using the following format:

MONGODB_URI=mongodb://mongo:27017/ecommerce

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

NEXT_PUBLIC_BASE_URL=http://localhost:3000

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=random_secure_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
⚠️ Use a Gmail App Password instead of your regular Gmail password.


📦 Project Structure
.
├── app/                  # App Router pages
├── components/           # Reusable components
├── lib/                  # Helpers (email, db, etc.)
├── public/               # Static assets
├── styles/               # Tailwind & globals
├── .env.example          # Sample env file
├── docker-compose.yml    # Docker orchestration
├── Dockerfile            # Docker image build
└── README.md             # This file

📧 Order Confirmation Email
After payment, an email is automatically sent to the user with the order details.

📦 Production Deployment
You can deploy using any Docker-compatible platform (Render, Railway, DigitalOcean, etc.), or push it to Vercel and configure the environment variables there.