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
    <div className="flex items-center justify-center mt-44">
      <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <Form {...form} className="w-full">
        <h1 className="text-center text-4xl font-bold mb-4 ">Sign Up</h1>
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
