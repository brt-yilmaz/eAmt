'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useSearchParams } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import { verifyAccount } from "@/services/verifyAccount";
import FormCard from "../FormCard";
import { login } from "@/services/login";


const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),

    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((data) => /[A-Z]/.test(data), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((data) => /[a-z]/.test(data), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((data) => /\d/.test(data), {
      message: "Password must contain at least one digit",
    })
    .refine((data) => /[!@#$%^&*(),.?":{}|<>]/.test(data), {
      message: "Password must contain at least one special character",
    }),
  
});

export default function LoginForm() {
  const { toast } = useToast();
  const t = useTranslations("LoginPage");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      password: "",
      email:  "",
    },
  });

  const onSubmit = async (data) => {

    const response = await login(data);
    const responseData = await response.json();
    console.log(responseData)

    if (response.status === 200) {

      toast({
        title: t('toast.success.title'),
        description: t('toast.success.content'),
        duration: 3000,
        action: (
          <ToastAction className="bg-muted" altText={t('toast.success.action')}>
            {t('toast.success.action')}
          </ToastAction>
        ),
      })

      router.replace(`/dashboard/profile`);


    } else {
      if (responseData.errorCode === 'AL101') {
        form.formState.errors.email = {
          type: 'manual',
          message: t('toast.invalidCredentials'),
        }

        form.formState.errors.password = {
          type: 'manual',
          message: t('invalidCredentials'),
        }

      }
       else {

        toast({
          title: t('toast.error.title'),
          description: t('toast.error.content'),
          variant: "destructive",
          duration: 3000,
        });

      }
    }
  };
  return (
<FormCard>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{t("CardTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col "
          >

            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("emailLabelPlaceholder")}
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
                  <FormLabel>{t("passwordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("passwordLabelPlaceholder")}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           


            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                (!form.formState.isValid &&
                  Object.keys(form.formState.errors).length !== 0) ||
                form.formState.isSubmitting
              }
              className="w-full"
            >
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t("signInButton")}
            </Button>
          </form>
        </Form>
        <Label className={"text-muted-foreground "}>{t('dontHaveAccount')} <Link className={"underline hover:text-primary ml-1 animate-pulse "} href="/dashboard/signup">{t('signUpText')}</Link>  </Label>

      </CardContent>
    </FormCard>
  )
  
  


}