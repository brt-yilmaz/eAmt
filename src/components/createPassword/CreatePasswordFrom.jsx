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
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <h1 className={`${form.formState.isSubmitting ? "text-blue-400" : ""} text-center text-2xl sm:text-4xl font-bold mb-4`}>
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
          <p className="text-center text-sm text-gray-600 mt-4">
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
