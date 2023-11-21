"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "../ui/button";

const formSchema = z.object({
  amtCode: z.string().min(1, {
    message: "Activation Code is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),
});

const VerifyEmailPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/verifyAccount", data);
      setVerified(true);
      toast.success("Verification successful!");
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
  }, [form.watch()]);

  return (
    <div className="flex items-center justify-center mt-44">
    <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <Form {...form} className="w-full">
          <h1 className="text-center text-4xl font-bold mb-4">
            Verification
          </h1>
          {verified ? (
            <div className="text-center mb-4">
              <h2 className="text-4xl ">Verification Successful
              </h2>
              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          </div>
              <Link href="/en/createpassword" className="text-green-400 text-center text-xl hover:underline">
                <h2>Go to password creation page</h2>
              </Link>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
              <FormField
                control={form.control}
                name="amtCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activation Code (Amt Code)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Activation Code" {...field} />
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
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full mt-6" type="submit">
                Verify
              </Button>
              <Link href="/en/createpassword" className="text-blue-400 text-center hover:underline block mt-3">
                Visit Create Password page
              </Link>
              {error && (
                <div>
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              )}
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
