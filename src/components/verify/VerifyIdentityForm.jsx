/* "use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormInput from "../formInput/FormInput";

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
              <Link href="/en/createpassword" className="text-blue-400 text-center hover:underline block mt-3">
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
 */













// Import statements...
/* "use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  amtCode: z.string().min(2, {
    message: "Activation Code must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

const VerifyEmailPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

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

      // Handle successful verification
      setVerified(true);
      setToken(response.data.token);

      // Additional actions after successful verification, if needed
      // For example, navigate to another page
      router.push("/en/createpassword");
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
    <div className="flex items-center justify-center mt-20">
      <div className="w-full max-w-md bg-slate-200 p-6 dark:bg-slate-800 rounded-md">
        <Form {...form} className="w-full">
          <h1 className="text-center text-4xl font-bold mb-4 ">Verification</h1>
          {verified ? (
            <div>
              <h2 className="text-center text-4xl text-blue-400 m-4">Successfully Verified ☑️</h2>
              <p>{token}</p>
              <Button className="w-full mt-4" onClick={() => router.push("/en/createpassword")}>
                Go to password creation page
              </Button>
            </div>
          ) : (
            <div>
              <FormField
                name="amtCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activation Code (Amt Code)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Activation Code" {...field} />
                    </FormControl>
                    <FormMessage>{errors.amtCode}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage>{errors.email}</FormMessage>
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-4"
                onClick={verifyUserEmail}
              >
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
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;










 */






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
    <div className="flex items-center justify-center h-screen">
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
