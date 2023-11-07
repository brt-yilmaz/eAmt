"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { OpenEyeIcon, ClosedEyeIcon } from "./EyeIcons.js";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSignup = async () => {
    setFormSubmitted(true);
    try {
      setLoading(true);
      const isEmailExists = await checkEmailExists(user.email);
  
      if (isEmailExists) {
        setEmailError("This email is already registered, use another email");
        setLoading(false);
        return;
      }
  
      console.log(user);
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      if (user.name.trim() === "") {
        setNameError("Name is required");
      } else if (!/^[A-Za-z\s]+$/.test(user.name)) {
        setNameError("Name should be written in Latin characters.");
      } else {
        setNameError("");
      }

      if (user.email.trim() === "") {
        setEmailError("Email is required");
      } else if (!isValidEmail(user.email)) {
        setEmailError("Please enter a correct email address (you entered the data in the wrong format)");
      } else {
        setEmailError("");
      }

      if (user.password.trim() === "") {
        setPasswordError("Password is required");
      } else if (!isStrongPassword(user.password)) {
        setPasswordError("Password should be at least 6 characters long and contain a mix of upper and lower case letters, numbers, and special characters.");
      } else {
        setPasswordError("");
      }
    }
  }, [user, formSubmitted]);
  

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  function isStrongPassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordPattern.test(password);
  }

  async function checkEmailExists(email) {
    return false;
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex items-center justify-center min-h-full py-40">
      <div className="w-1/6 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-2">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className={`${loading ? "text-blue-400" : "text-white"} text-4xl font-bold mb-4`}>
            {loading ? "Processing" : "Signup"}
          </h1>
          <label htmlFor="name" className="text-white text-lg mb-2">
            Name
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-black"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Name"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}

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
          <div className="relative">
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-black"
              id="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
           <button
                className="absolute top-2 right-5 focus:outline-none"
                onClick={togglePasswordVisibility}
                >
                {showPassword ? ClosedEyeIcon : OpenEyeIcon}
            </button>
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <button
            onClick={onSignup}
            className="w-full p-2 border border-blue-400 rounded-lg mb-4 focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            Signup
          </button>
          <Link href="/login" className="text-blue-400 hover:underline">
            Visit login page
          </Link>
        </div>
      </div>
    </div>
  );
}
