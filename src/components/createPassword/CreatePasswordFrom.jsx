'use client';
import React, { useState } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError("An error occurred while sending the request");
    }
  };

  return (
    <div className="flex items-center justify-center py-40">
      <div className="w-1/6 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-10">
        <h1 className={`${error ? "text-red-500" : "text-white"} text-4xl font-bold text-center`}>
          {error ? "Error" : "Create Password"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="m-4">
            <label htmlFor="email" className="text-white text-lg mb-2 block">Email:</label>
            <input
              className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-black"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="m-4">
            <label htmlFor="password" className="text-white text-lg mb-2 block">Password:</label>
            <input
              className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-black"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="m-4">
            <label htmlFor="confirmPassword" className="text-white text-lg mb-2 block">Confirm Password:</label>
            <input
              className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-black"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="m-4 w-72 p-2 border border-blue-400 rounded-lg focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            Create Password
          </button>
        </form>
        {message && <p className="text-white mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default SignupForm;
