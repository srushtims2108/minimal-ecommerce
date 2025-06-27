'use client';

import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = async () => {
    if (!isLogin && password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const res = await axios.post(url, { email, password });
      alert(res.data.message || "Success");
    } catch (error: any) {
      alert(error.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bfb8f2]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-l-full ${
              isLogin ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-r-full ${
              !isLogin ? "bg-gradient-to-r from-blue-900 to-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Signup
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login Form" : "Signup Form"}
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 border rounded-full focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-full focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border rounded-full focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {isLogin && <p className="text-right text-blue-600 text-sm mb-4">Forgot password?</p>}

        <button
          onClick={handleAuth}
          className="w-full p-3 text-white rounded-full bg-gradient-to-r from-blue-900 to-blue-500"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <div className="mt-4 text-center">
          <p className="mb-2 text-sm text-gray-600">or</p>
          <button
            onClick={() => signIn("google")}
            className="w-full p-3 text-white rounded-full bg-red-500 hover:bg-red-600"
          >
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-4 text-sm">
          {isLogin ? (
            <>
              Not a member?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Signup now
              </span>
            </>
          ) : (
            <>
              Already a member?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
