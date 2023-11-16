"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import FormInput from "../formInput/FormInput";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    setFormSubmitted(true);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      if (user.email.trim() === "") {
        setErrors({ ...errors, email: "Email is required" });
      } else if (!isValidEmail(user.email)) {
        setErrors({ ...errors, email: "Please enter a correct email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }

      if (user.password.trim() === "") {
        setErrors({ ...errors, password: "Password is required" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  }, [user, formSubmitted]);

  const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

  return (
    <div className="flex items-center justify-center min-h-full py-40">
      <div className="w-full sm:w-full md:w-96 lg:w-96 xl:w-96 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-2">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className={`${loading ? "text-blue-400" : "text-white "} text-5xl font-bold mb-4 text-center`}>
            {loading ? "Processing" : "Login"}
          </h1>

          <FormInput 
            label="Email" 
            value={user.email} 
            onChange={(value) => setUser({ ...user, email: value })} 
            errors={errors.email} 
          />
          <FormInput 
            label="Password" 
            type="password" 
            value={user.password} 
            onChange={(value) => setUser({ ...user, password: value })} 
            errors={errors.password}
            isPassword={true}
          />

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

          {errorMessage && (
            <div>
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
