'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormInput from "../formInput/FormInput";

function CreatePasswordForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/users/createPassword", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setMessage("");
      }
    } catch (error) {
      setError("An error occurred while sending the request");
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-20">
      <div className="w-full sm:w-96 md:w-96 lg:w-96 xl:w-96 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-5">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className={`${isLoading ? "text-blue-400" : "text-white"} text-center text-2xl sm:text-4xl font-bold mb-4`}>
            {isLoading ? "Processing" : "Create Password"}
          </h1>
          <FormInput
            label="Email"
            value={formData.email}
            onChange={(value) => handleChange({ target: { name: "email", value } })}
            errors={errors.email}
          />
          <FormInput
            label="Password"
            value={formData.password}
            onChange={(value) => handleChange({ target: { name: "password", value } })}
            errors={errors.password}
            isPassword={true}
          />
          <FormInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(value) => handleChange({ target: { name: "confirmPassword", value } })}
            errors={errors.confirmPassword}
            isPassword={true}
          />

          <button
            onClick={handleSubmit}
            className="w-full p-3 border border-blue-400 rounded-lg focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            {isLoading ? "Processing..." : "Create Password"}
          </button>
          <Link href="/en/login" className="text-blue-400 hover:underline block mt-3 text-center">
            Go to Login page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatePasswordForm;



