'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "@/navigation"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signup } from "@/services/signup"
import { ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"
import { useTranslations } from "next-intl"
import { Link } from "@/navigation"
import { Router } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }).max(30, {
    message: "First name must be less than 30 characters.",
  }),

  email: z.string().email({
    message: "Please provide a valid email address.",
  }),

  taxId: z.string().min(10, {
    message: "Tax ID must be at least 10 characters.",
  }).max(10, {
    message: "Tax ID must be less than 10 characters.",
  }),

  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }).max(5, {
    message: "Zip code must be less than 5 characters.",
  }),
  
})

export default function SignUp() {
  const {toast} = useToast()
  const tf = useTranslations('SignUp')
  const tb = useTranslations('AuthenticationError')
  const router = useRouter()

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      taxId: "",
      zipCode: ""
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
   const response = await signup(values)
   const data = await response.json()

   if(response.status === 200) {
    form.reset()

    toast({
      title: tf('toast.success.title'),
      description: tf('toast.success.content'),
      duration: 15000,
      action: (
        <ToastAction className="bg-muted" altText={tf('toast.success.action')}>
          {tf('toast.success.action')}
        </ToastAction>
      ),
    })

    router.push(`/dashboard`)
    

   } else {
    if (data.errorCode === 'AS107') {
      form.formState.errors.email = {
        type: 'manual',
        message: tb('signUp.AS107'),
      }
    } else {
      toast({
        title: 'Error',
        description: tb(`signUp.${data.errorCode}`),
      })
    }
   }



}

  return (
    <Card className="w-[380px] bg-muted">
       <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{tf('CardTitle')}</CardTitle>
        <CardDescription>
          {tf('CardDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> { tf('nameLabel') } </FormLabel>
              <FormControl>
                <Input placeholder={`${tf('nameLabelPlaceholder')}`} {...field} autoFocus />
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
              <FormLabel> { tf('emailLabel') } </FormLabel>
              <FormControl>
                <Input placeholder= {`${tf('emailLabelPlaceholder')}`} {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={"flex gap-4 "}>
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem className="w-[158px]">
              <FormLabel> { tf('taxIdLabel') }  </FormLabel>
              <FormControl>
                <Input placeholder= {`${tf('taxIdLabelPlaceholder')}`} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="w-[158px] align-self-end">
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder= {`${tf('zipCodeLabelPlaceholder')}`} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
       
        <Button type="submit" disabled={(!form.formState.isValid && Object.keys(form.formState.errors).length !== 0) || form.formState.isSubmitting  } className="w-full">
        {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          { tf('submit') }
          </Button>
      </form>
    </Form>
    <Label className={"text-muted-foreground"}>{tf('alreadyHaveAccount')} <Link className={"underline hover:text-primary ml-1 "} href="/dashboard/login">{tf('loginText')}</Link>  </Label>
    <Label className={"text-muted-foreground"}>{tf('needToVerify')} <Link className={"underline hover:text-primary ml-1"} href="/dashboard/verifyAccount">{tf('verify')}</Link>  </Label>
    </CardContent>
    </Card>
  )

}