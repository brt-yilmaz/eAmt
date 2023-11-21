

/* "use client";
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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      setLoading(true);
      console.log(user);

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
      console.log("Signup success", response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.log("Signup error", typeof error.response.data.error);
      if (error.response.data.error.startsWith("User")) {
        setErrors({
          ...errors,
          email: error.response.data.error,
        });
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
    <div className="flex flex-col items-center justify-center min-h-full py-10">
      <div className="w-full sm:w-96 md:w-96 lg:w-96 xl:w-96 bg-gradient-to-b from-gray-800 via-gray-950 to-black rounded-lg py-5">
        <div className="p-5 rounded-lg border-t-4">
          <h1 className={`${loading ? "text-blue-400" : "text-white"} text-center text-2xl sm:text-4xl font-bold mb-4`}>
            {loading ? "Processing" : "Signup"}
          </h1>

          {!registrationSuccess ? (
            <>
              <FormInput label="Name" value={user.name} onChange={(value) => setUser({ ...user, name: value })} errors={errors.name} />
              <FormInput label="Email" value={user.email} onChange={(value) => setUser({ ...user, email: value })} errors={errors.email} />
              <FormInput
                label="Identification Number"
                value={user.identificationNumber}
                onChange={(value) => setUser({ ...user, identificationNumber: value })}
                errors={errors.identificationNumber}
              />
              <FormInput label="ZIP-Number" value={user.plzNumber} onChange={(value) => setUser({ ...user, plzNumber: value })} errors={errors.plzNumber} />

              <button
                onClick={onSignup}
                className="w-full p-3 border border-blue-400 rounded-lg focus:outline-none text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="text-green-400 text-center mb-4">Registration completed successfully! Please check your email for a verification code. Once received, click the button below to complete the verification process.</div>
          )}

          <div className="flex justify-between mt-3">
            {!registrationSuccess ? (
              <>
                <Link href="/en/verify" className="text-blue-400 hover:underline block text-center">
                  Verification
                </Link>
                <Link href="/en/login" className="text-blue-400 hover:underline block text-center">
                  Login
                </Link>
              </>
            ) : (
              <Link href="/en/verify" className="text-blue-400 hover:underline block text-center">
                Verify Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 */



"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  identificationNumber: z.string(),
  plzNumber: z.string(),
});

// ... (your existing imports)

const SignupPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/signup", data);
      toast.success("Signup successful!");
      setRegistrationSuccess(true);
    } catch (error) {
      toast.error(error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        form.setError("email", {
          message: errorMessage,
        });
      } else {
        console.error("Unknown error", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <Form {...form} className="w-full">
          {registrationSuccess ? (
            <div className="text-green-400 text-center mb-4">
              Registration completed successfully! Please check your email for a verification code.
              Once received, click the button below to complete the verification process.
              <Button className="w-full mt-4" onClick={() => router.push("/en/verify")}>
                Verify Now
              </Button>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="identificationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Identification Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plzNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PLZ-Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your PLZ-Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full mt-6" type="submit">
                Sign Up
              </Button>
            </form>
          )}

          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            If you already have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/en/login">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
