/* "use client";
import React, { useState } from "react";
const VerificationForm = () => {
  const [formData, setFormData] = useState({
    code: "",
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/verify", formData);
      console.log("Успешная верификация:", response.data);
    } catch (error) {
      console.error("Ошибка верификации:", error);
    }
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-400 w-1/5">
        <h1 className="text-xl font-bold my-4 text-center">
          Verify your account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Code"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Password"
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Confirm Password"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-400 text-gray font-bold cursor-pointer px-6 py-2"
            >
              Verify
            </button>
          </div>
          <div className="flex justify-between p-3">
            <button className="text-blue-400 cursor-pointer">Sign In</button>
            <button className="text-blue-400 cursor-pointer">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
 */
"use client"
import React, { useState } from "react";
import axios from "axios";

const VerificationPage = () => {
  const [formData, setFormData] = useState({
    amtCode: "",
    email: "",
  });

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/verify", formData);
      console.log("Успешная верификация:", response.data);

      // После успешной верификации, установите токен из ответа.
      setToken(response.data.token);

      // Затем выполните верификацию по токену.
      verifyUserEmail();
    } catch (error) {
      console.error("Ошибка верификации:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <div className="w-1/6 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-2">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className="text-white text-4xl font-bold mb-4">
            Verify Email
          </h1>
          {verified ? (
            <div>
              <h2 className="text-2xl">Email Verified</h2>
              <p>Token: {token}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
               <label htmlFor="amtCode" className="text-white text-lg mb-2">
                Amt Aktivierungs Code
               </label>
              <input
                type="text"
                id="amtCode"
                name="amtCode"
                value={formData.amtCode}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Amt Code"
              />
              <label htmlFor="email" className="text-white text-lg">
                Email
               </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Email"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-400 text-gray font-bold cursor-pointer px-6 py-2"
                >
                  Verify
                </button>
              </div>
            </form>
          )}
          {error && (
            <div>
              <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
