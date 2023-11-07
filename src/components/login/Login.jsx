"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onLogin = async () => {
    setFormSubmitted(true);
    try {
      setLoading(true);
      // Perform login logic here
      // Replace the following line with actual login code
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      router.push("/dashboard"); // Replace with the actual dashboard route
    } catch (error) {
      console.log("Login error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      // Validate email
      if (user.email.trim() === "") {
        setEmailError("Email is required");
      } else if (!isValidEmail(user.email)) {
        setEmailError("Please enter a correct email address");
      } else {
        setEmailError("");
      }

      // Validate password
      if (user.password.trim() === "") {
        setPasswordError("Password is required");
      } else {
        setPasswordError("");
      }

      if (user.email && user.password) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [user, formSubmitted]);

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  return (
    <div className="flex items-center justify-center min-h-full py-40">
      <div className="w-1/6 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-2">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className={`${loading ? "text-blue-400" : "text-white"} text-4xl font-bold mb-4`}>
            {loading ? "Processing" : "Login"}
          </h1>
          <label htmlFor="email" className="text-white text-lg mb-2">
            Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <label htmlFor="password" className="text-white text-lg mb-2">
            Password
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <button
          onClick={onLogin}
          className="w-full p-2 border border-blue-400 rounded-lg mb-4 focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
          disabled={loading}
        >
          Login
        </button>

          <Link href="/signup" className="text-blue-400 hover:underline">
            Visit signup page
          </Link>
        </div>
      </div>
    </div>
  );
}
