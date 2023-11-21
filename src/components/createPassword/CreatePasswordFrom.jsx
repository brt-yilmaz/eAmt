/* 'use client';

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
          <div className="flex justify-between">
          <Link href="/en/login" className="text-blue-400 hover:underline block mt-3 text-center">
            Login
          </Link>
          <Link href="/en/signup" className="text-blue-400 hover:underline mt-3">
            Signup
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePasswordForm;



 */












"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

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

const createPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    ,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    ,
  confirmPassword: z
    .string()
});

const CreatePasswordForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createPasswordFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/createPassword", data);
      if (response.ok) {
        const responseData = response;
        toast.success(responseData.message);
      } else {
        const errorData = response;
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred while sending the request", error);
      toast.error("An error occurred while sending the request");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <h1 className={`${form.formState.isSubmitting ? "text-blue-400" : "text-white"} text-center text-2xl sm:text-4xl font-bold mb-4`}>
          {form.formState.isSubmitting ? "Processing" : "Create Password"}
        </h1>
        <Form {...form} className="w-full">
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <div className="space-y-2">
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full mt-6" type="submit">
              Create Password
            </Button>
          </form>

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

export default CreatePasswordForm;



/* "use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"; // Подставьте правильный путь к вашим компонентам
import { Input } from "../components/ui/input"; // Подставьте правильный путь к вашим компонентам
import { Button } from "../components/ui/button"; // Подставьте правильный путь к вашим компонентам

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  confirmPassword: z.string(),
});

function CreatePasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users/createPassword", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);
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
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-gray-200 p-6 rounded-md">
        <Form {...form} className="w-full">
          <h1 className="text-center text-4xl font-bold mb-4">Create Password</h1>
          {message && (
            <div className="text-green-400 text-center mb-4">{message}</div>
          )}
          {error && (
            <div className="text-red-400 text-center mb-4">{error}</div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full mt-6" type="submit">
              {isLoading ? "Processing..." : "Create Password"}
            </Button>
          </form>

          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-400">
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
}

export default CreatePasswordForm;
 */