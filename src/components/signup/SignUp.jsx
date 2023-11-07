"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import plz from "@/data/plz";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function () {
  //const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    identificationNumber: "",
    plzNumber: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [identificationNumberError, setIdentificationNumberError] = useState("");
  const [plzNumberError, setPlzNumberError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSignup = async () => {
    setFormSubmitted(true);
    try {
      setLoading(true);
      // Add your email check logic here
      console.log(user);
  
      if (user.identificationNumber.trim().length !== 11 || !/^\d+$/.test(user.identificationNumber)) {
        setIdentificationNumberError("Identification Number should contain exactly 11 digits.");
        setLoading(false);
        return;
      }
  
      if (user.plzNumber.trim().length !== 5 || !/^\d+$/.test(user.plzNumber)) {
        setPlzNumberError("PLZ-Number should contain exactly 5 digits.");
        setLoading(false);
        return;
      }
  
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

          <label htmlFor="identificationNumber" className="text-white text-lg mb-2">
            Identification Number
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-black"
            id="identificationNumber"
            type="text"
            value={user.identificationNumber}
            onChange={(e) => setUser({ ...user, identificationNumber: e.target.value })}
            placeholder="Identification Number"
          />
          {identificationNumberError && <p className="text-red-500">{identificationNumberError}</p>}

          <label htmlFor="plzNumber" className="text-white text-lg mb-2">
            ZIP-Number
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-black"
            id="plzNumber"
            type="text"
            value={user.plzNumber}
            onChange={(e) => setUser({ ...user, plzNumber: e.target.value })}
            placeholder="PLZ-Number"
          />
          {plzNumberError && <p className="text-red-500">{plzNumberError}</p>}

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
