'use client';
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { LogOut } from 'lucide-react';
import { useUser } from "@/services/useUser";
import { logout } from "@/services/logout";
import { useSWRConfig } from "swr"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
function SignIn() {
  const { user, isLoading, isError } = useUser();
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const { mutate } = useSWRConfig();
  return (

    user ? (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className={"text-muted-foreground border-none"}  ><LogOut /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("logout.content")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("logout.subContent")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("logout.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              await logout()
              mutate("/api/users/me", true)
              router.push("/dashboard")
            }} >{t("logout.confirm")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>





      // <Popover >
      //   <PopoverTrigger><Button variant="outline" size="sm" className={"text-muted-foreground border-none"}  ><LogOut /></Button></PopoverTrigger>
      //   <PopoverContent className="w-[70px] p-2 flex flex-col gap-2 justify-center" >
      //     <PopoverRadix.Close >
      //     <Button variant="outline" size="sm" ><X /></Button>
      //     </PopoverRadix.Close>
      //     <Button variant="outline" size="sm" onClick={async () => {
      //       await logout()
      //       mutate("/api/users/me", true)
      //     }}><Check />
      //     </Button>

      //   </PopoverContent>
      // </Popover>

    )
      : (
        <Link href={`/login`}>
          <Button
            className={"min-w-[100px] border-none "} size="sm"  >
            {t("signIn")}
          </Button>
        </Link>
      )
  )
}

export default SignIn;


