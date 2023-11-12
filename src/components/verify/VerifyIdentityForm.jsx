"use client";
// Import statements
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormInput from "../formInput/FormInput";

// VerifyEmailPage component
const VerifyEmailPage = () => {
  const [formData, setFormData] = useState({
    amtCode: "",
    email: "",
  });

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    amtCode: "",
    email: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.amtCode.trim() === "") {
      newErrors.amtCode = "Activation Code is required";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyUserEmail = async () => {
    setError(false);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("/api/users/verifyAccount", formData);
      setVerified(true);
      setToken(response.data.token);
    } catch (error) {
      setError(true);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage);
      } else {
        console.error("Unknown error", error);
      }
    }
  };

  useEffect(() => {
    setError(false);
    setErrorMessage("");
  }, [formData]);

  return (
    <div className="flex items-center justify-center py-40">
      <div className="w-full sm:w-full md:w-96 lg:w-96 xl:w-96 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className="text-white text-center text-4xl font-bold mb-4">
            Verification
          </h1>
          {verified ? (
            <div>
              <h2 className="text-center text-4xl text-blue-400 m-4">Successfull  ☑️</h2>
              <p>{token}</p>
              <Link href="/en/createpassword" className="text-green-400 text-center text-xl hover:underline">            
                <h2>Go to password creation page</h2>
              </Link>
            </div>
          ) : (
            <div>
              <FormInput 
                label="Activation Code (Amt Code)" 
                value={formData.amtCode} 
                onChange={(value) => setFormData({ ...formData, amtCode: value })}
                errors={errors.amtCode}
              />
              <FormInput 
                label="Email" 
                value={formData.email} 
                onChange={(value) => setFormData({ ...formData, email: value })}
                errors={errors.email}
              />

              <button
                onClick={verifyUserEmail}
                className="mt-4 w-full p-2 border border-blue-400 rounded-lg focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                Verify
              </button>
              <Link href="/en/verify" className="text-blue-400 text-center hover:underline block mt-3">
                Visit Create Password page
              </Link>
              {error && (
                <div>
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
