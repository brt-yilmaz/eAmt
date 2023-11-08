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
    <div className="flex items-center justify-center py-40">
      <div className=" bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-2">
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
            <form onSubmit={handleSubmit} className="flex flex-col">
               <label htmlFor="amtCode" className="text-white text-lg mb-2">
                Amt activation code
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
            <button
            className="mt-4 p-2 border border-blue-400 rounded-lg mb-4 focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            Verify
          </button>
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
