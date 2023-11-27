'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import SignaturePad from "../signature/signature"
import { useSWRConfig } from "swr"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
import { identity } from "@/services/identity"
import UploadImageButton from "../ui/UploadIdentityImage"
import { useRouter } from "@/navigation"

const formSchema = z.object({
  surname: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  firstName: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  nationality: z.string().min(3, { message: "Nationality must be at least 3 characters long" }),
  dateOfBirth: z
    .string()
    .refine((data) => /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(data), {
      message: "Invalid date format. Use DD.MM.YYYY format.",
    }),

  placeOfBirth: z.string().min(3, { message: "Place of Birth must be at least 3 characters long" }),
})

export default function AusweisForm() {
  const { toast } = useToast()
  const tf = useTranslations('IdentityForm')
  const router = useRouter()
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surname: "",
      firstName: "",
      nationality: "",
      dateOfBirth: "",
      placeOfBirth: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values)
    const response = await identity(values)
    const data = await response.json()

    if (response.status === 200) {
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
      router.push('/dashboard/profile/documents')

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6   ">

            <FormField
              control={form.control}

              name="surname"
              render={({ field }) => (
                <FormItem >
                  <FormLabel> {tf('surnameLabel')} </FormLabel>
                  <FormControl>
                    <Input placeholder={`${tf('surnameLabelPlaceholder')}`} {...field} autoFocus />
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
                  <FormLabel> {tf('firstNameLabel')} </FormLabel>
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
                  <FormLabel> {tf('nationalityLabel')} </FormLabel>
                  <FormControl>
                    <Input placeholder={`${tf('nationalityLabelPlaceholder')}`} {...field} autoFocus />
                  </FormControl>

                  <FormMessage />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {tf('dateOfBirthLabel')} </FormLabel>
                  <FormControl>
                    <Input placeholder={`${tf('dateOfBirthLabelPlaceholder')}`} {...field} autoFocus />
                  </FormControl>

                  <FormMessage />
                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {tf('placeOfBirthLabel')} </FormLabel>
                  <FormControl>
                    <Input placeholder={`${tf('placeOfBirthLabelPlaceholder')}`} {...field} autoFocus />
                  </FormControl>

                  <FormMessage />
                </FormItem>

              )}
            />

            <div className="flex justify-between ">

            <UploadImageButton  />
              <Dialog >
              <DialogTrigger className={"underline"} >Add Signature</DialogTrigger>
              <DialogContent>
                <SignaturePad />
              </DialogContent>
            </Dialog>
            </div>
            

            <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {tf('submit')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </FormCard>
  )

}