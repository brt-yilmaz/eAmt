"use client"
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from 'next-intl';
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
import axios from "axios";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string(),
});

const LoginPage = () => {

  
  const router = useRouter(); 
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        form.setError("email", {
          message: errorMessage,
        });
      } else {
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-52">
      <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <Form {...form} className="w-full">
        <h1 className="text-center text-4xl font-bold mb-4">
            Login
          </h1>
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




