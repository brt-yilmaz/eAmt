"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import FormInput from "../formInput/FormInput"; 

export default function () {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    identificationNumber: "",
    plzNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [identificationNumberError, setIdentificationNumberError] = useState("");
  const [plzNumberError, setPlzNumberError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    identificationNumber: "",
    plzNumber: "",
  });

  const onSignup = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      setLoading(true);
      
      const newErrors = {};

      if (user.name.trim() === "") {
        newErrors.name = "Name is required";
      }

      if (user.email.trim() === "") {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(user.email)) {
        newErrors.email = "Please enter a correct email address (you entered the data in the wrong format)";
      }

      if (user.identificationNumber.trim() === "") {
        newErrors.identificationNumber = "Identification Number is required";
      } else if (user.identificationNumber.trim().length !== 11 || !/^\d+$/.test(user.identificationNumber)) {
        newErrors.identificationNumber = "Identification Number should contain exactly 11 digits.";
      }

      if (user.plzNumber.trim() === "") {
        newErrors.plzNumber = "PLZ-Number is required";
      } else if (user.plzNumber.trim().length !== 5 || !/^\d+$/.test(user.plzNumber)) {
        newErrors.plzNumber = "PLZ-Number should contain exactly 5 digits.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error) {
      if (error.response.data.error.startsWith('User')) {
        setErrors({
          ...errors, 
          email:error.response.data.error,
        })
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      if (user.name.trim() === "") {
        setNameError("Name is required");
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

      if (user.identificationNumber.trim() === "") {
        setIdentificationNumberError("Identification Number is required");
      } else {
        setIdentificationNumberError("");
      }
    
      if (user.plzNumber.trim() === "") {
        setPlzNumberError("PLZ-Number is required");
      } else {
        setPlzNumberError("");
      }
    }
  }, [user, formSubmitted]);

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-20">
      <div className="w-full sm:w-96 md:w-96 lg:w-96 xl:w-96 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-5">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className={`${loading ? "text-blue-400" : "text-white"} text-center text-2xl sm:text-4xl font-bold mb-4`}>
            {loading ? "Processing" : "Signup"}
          </h1>

          <FormInput 
          label="Name" 
          value={user.name} 
          onChange={(value) => setUser({ ...user, name: value })} 
          errors={errors.name} />
          <FormInput 
          label="Email" value={user.email}
          onChange={(value) => setUser({ ...user, email: value })} 
          errors={errors.email} />
          <FormInput 
          label="Identification Number" 
          value={user.identificationNumber} 
          onChange={(value) => setUser({ ...user, identificationNumber: value })} 
          errors={errors.identificationNumber} />
          <FormInput 
          label="ZIP-Number" 
          value={user.plzNumber} 
          onChange={(value) => setUser({ ...user, plzNumber: value })} 
          errors={errors.plzNumber} />

          <button
            onClick={onSignup}
            className="w-full p-3 border border-blue-400 rounded-lg focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            Signup
          </button>
          <Link href="/en/verify" className="text-blue-400 hover:underline block mt-3 text-center">Visit Verification page</Link>
        </div>
      </div>
    </div>
  );
}