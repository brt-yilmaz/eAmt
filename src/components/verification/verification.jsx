// // Import necessary libraries and components
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Icons } from "@/components/icons";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { verify } from "@/services/verify"; // Assuming a verify service is available
// import { ToastAction } from "../ui/toast";
// import { useToast } from "../ui/use-toast";
// import { useTranslations } from "next-intl";
// import { Link } from "@/navigation";

// // Define the schema for verification form
// const verificationSchema = z.object({
//   amtCode: z.string().min(6, {
//     message: "AMT code must be at least 6 characters.",
//   }),
//   email: z.string().email({
//     message: "Please provide a valid email address.",
//   }),
// });

// // Verification component
// export default function Verification() {
//   const { toast } = useToast();
//   const tf = useTranslations("Verification");
//   const tb = useTranslations("AuthenticationError");

//   // Define the verification form
//   const form = useForm({
//     resolver: zodResolver(verificationSchema),
//     defaultValues: {
//       amtCode: "",
//       email: "",
//     },
//   });

//   // Define submit handler for verification form
//   async function onSubmit(values) {
//     // Assuming a verify function is available in the verify service
//     const response = await verify(values);
//     const data = await response.json();

//     if (response.status === 200) {
//       // Verification successful, you can handle success actions here
//     } else {
//       // Handle verification error
//       toast({
//         title: "Error",
//         description: tb(`verification.${data.errorCode}`),
//       });
//     }
//   }

//   return (
//     <Card className="w-[380px]">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl">{tf("CardTitle")}</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 flex flex-col "
//           >
//             {/* AMT Code Input */}
//             <FormField
//               control={form.control}
//               name="amtCode"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{tf("amtCodeLabel")}</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder={tf("amtCodeLabelPlaceholder")}
//                       {...field}
//                       autoFocus
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Email Input */}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{tf("emailLabel")}</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder={tf("emailLabelPlaceholder")}
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               disabled={
//                 (!form.formState.isValid &&
//                   Object.keys(form.formState.errors).length !== 0) ||
//                 form.formState.isSubmitting
//               }
//               className="w-full"
//             >
//               {form.formState.isSubmitting && (
//                 <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//               )}
//               {tf("submit")}
//             </Button>
//           </form>
//         </Form>
//         {/* Additional content or links can be added here */}
//       </CardContent>
//     </Card>
//   );
// }
