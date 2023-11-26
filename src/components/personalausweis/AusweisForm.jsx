'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

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
import FormCard from "../FormCard"

const formSchema = z.object({
  surname: z.string(),
  nameOfBirth: z.string(),
  firstName: z.string(),
  nationality: z.string(),
  dateOfBirth: z.date(),
  placeOfBirth: z.string(),
  dateOfExpiry: z.date(),
})

export default function IdentityForm() {
  const {toast} = useToast()
  const tf = useTranslations('IdentityForm')

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: "",
      nameOfBirth: "",
      firstName: "",
      nationality: "",
      dateOfBirth: "",
      placeOfBirth: "",
      dateOfExpiry: "",
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
      duration: 3000,
      action: (
        <ToastAction className="bg-muted" altText={tf('toast.success.action')}>
          {tf('toast.success.action')}
        </ToastAction>
      ),
    })
   
   } else {
   
     toast({
       title: 'Error',
       description: tf(`failed`),
       variant: 'destructive',
       duration: 3000,
    })
   }



}

  return (
    <FormCard >
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
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel> { tf('surnameLabel') } </FormLabel>
              <FormControl>
                <Input placeholder={`${tf('surnameLabelPlaceholder')}`} {...field} autoFocus />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="nameOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel> { tf('nameOfBirthLabel') } </FormLabel>
              <FormControl>
                <Input placeholder={`${tf('nameOfBirthLabelPlaceholder')}`} {...field} autoFocus />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel> { tf('firstNameLabel') } </FormLabel>
              <FormControl>
                <Input placeholder={`${tf('firstNameLabelPlaceholder')}`} {...field} autoFocus />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel> { tf('nationalityLabel') } </FormLabel>
              <FormControl>
                <Input placeholder={`${tf('nationalityLabelPlaceholder')}`} {...field} autoFocus />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
          )}
        />


        
        
       
       
        <Button type="submit" disabled={(!form.formState.isValid && Object.keys(form.formState.errors).length !== 0) || form.formState.isSubmitting  } className="w-full">
        {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          { tf('submit') }
          </Button>
      </form>
    </Form>
    <Label className={"text-muted-foreground "}>{tf('alreadyHaveAccount')} <Link className={"underline hover:text-primary ml-1 animate-pulse "} href="/dashboard/login">{tf('loginText')}</Link>  </Label>
    <Label className={"text-muted-foreground"}>{tf('needToVerify')} <Link className={"underline hover:text-primary ml-1"} href="/dashboard/verifyAccount">{tf('verify')}</Link>  </Label>
    </CardContent>
    </FormCard>
  )

}