/* "use client";
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
          <div className="flex justify-between">
          <Link href="/en/signup" className="text-blue-400 hover:underline">
            Signup
          </Link>
          <Link href="/en/createpassword" className="text-blue-400 text-center hover:underline block ">
                Create Password
          </Link>
          </div>

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


 */

/* "use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios"; // Import axios for API calls
import { toast } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string(),
});

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      toast.success("Login successful!");
      // Redirect to the dashboard page
      // router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        // Handle server-side error
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full mt-6" type="submit">
              Sign In
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            If you don't have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/en/signup">
              Signup
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;

 */

"use client"
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios"; // Import axios for API calls
import { toast } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string(),
});

const LoginPage = () => {
  const router = useRouter(); // Добавленный код
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      toast.success("Login successful!");
      // Redirect to the dashboard page
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        // Handle server-side error
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
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="w-full mt-6" type="submit">
              Sign In
            </Button>
          </form>
          <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            If you don't have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/en/signup">
              Signup
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
