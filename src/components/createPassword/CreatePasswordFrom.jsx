"use client"
import React from "react";
import { useRouter } from "@/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Link } from "@/navigation";
import { useSearchParams } from 'next/navigation'
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';

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
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import FormCard from "../FormCard";
import { createPassword } from "@/services/createPassword";
import { Label } from "../ui/label";
import { Icons } from "../icons";



const createPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
  ,
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
  confirmPassword: z
    .string()
    ,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const CreatePasswordForm = () => {
  const { toast } = useToast();
  const t = useTranslations("createPasswordPage");
  const router = useRouter();
  const userEmail = useSearchParams().get('email');

  const form = useForm({
    resolver: zodResolver(createPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: userEmail || "",
    },
  });

  const onSubmit = async (data) => {

    const response = await createPassword(data);
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

      router.replace(`/dashboard/login`);


    } else {
      if (responseData.errorCode === 'ACP101') {
        form.formState.errors.email = {
          type: 'manual',
          message: t('toast.error.contentACP101'),
        }

      }

      else if (responseData.errorCode === 'ACP200') {
        form.formState.errors.password = {
          type: 'manual',
          message: t('toast.error.contentACP200'),
        }

      }

      else if (responseData.errorCode === 'ACP109') {
        form.formState.errors.confirmPassword = {
          type: 'manual',
          message: t('toast.error.contentACP109'),
        }

      }

      else if (responseData.errorCode === 'ACP107') {
        form.formState.errors.confirmPassword = {
          type: 'manual',
          message: t('toast.error.contentACP107'),
        }

      }

      else if (responseData.errorCode === 'ACP106') {
        form.formState.errors.confirmPassword = {
          type: 'manual',
          message: t('toast.error.contentACP106'),
        }

      } else {

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("confirmPasswordLabelPlaceholder")}
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
              {t("createPasswordButton")}
            </Button>
          </form>
        </Form>
        <Label className={"text-muted-foreground "}>{t('alreadyHaveAccount')} <Link className={"underline hover:text-primary ml-1 animate-pulse "} href="/dashboard/login">{t('loginText')}</Link>  </Label>

      </CardContent>
    </FormCard>
  );
};

export default CreatePasswordForm;
