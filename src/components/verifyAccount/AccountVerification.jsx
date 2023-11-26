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

// Define the schema for verification form
const verificationSchema = z.object({
  amtCode: z.string().min(10, {
    message: "AMT code must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Please provide a valid email address.",
  }),
});

// Verification component
export default function AccountVerification() {
  const { toast } = useToast();
  const t = useTranslations("verifyAccountPage");
  const tl = useTranslations('SignUp');
  const router = useRouter();

  const userEmail = useSearchParams().get('email')


  // Define the verification form
  const form = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      amtCode: "",
      email: userEmail ? userEmail : "",
    },
  });

  // Define submit handler for verification form
  async function onSubmit(values) {
    // Assuming a verify function is available in the verify service
    const response = await verifyAccount(values);
    const data = await response.json();
    console.log(data)

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

    router.replace(`/dashboard/createPassword?email=${response.data.userEmail}`);


    } else {
      if(data.errorCode === 'AV102') {
        form.formState.errors.email = {
          type: 'manual',
          message: t('toast.error.contentAV102'),
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
  }

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


            {/* AMT Code Input */}
            <FormField
              control={form.control}
              name="amtCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("amtCodeLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("amtCodeLabelPlaceholder")}
                      {...field}
                      autoFocus
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
              {t("verifyButton")}
            </Button>
          </form>
        </Form>
        <Label className={"text-muted-foreground "}>{tl('alreadyHaveAccount')} <Link className={"underline hover:text-primary ml-1 animate-pulse "} href="/dashboard/login">{tl('loginText')}</Link>  </Label>
       
      </CardContent>
    </FormCard>
  );
}
