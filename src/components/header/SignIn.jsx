'use client';
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { LogOut } from 'lucide-react';
import { useUser } from "@/services/useUser";
import { logout } from "@/services/logout";
import { useSWRConfig } from "swr"
import * as PopoverRadix from '@radix-ui/react-popover';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { useState } from "react";
function SignIn() {
  const { user, isLoading, isError } = useUser();
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const { mutate } = useSWRConfig();
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)
  return (

    ( user && (isOpen || true)) ?  (
      <Popover >
        <PopoverTrigger><Button variant="outline" size="xs" className={"text-muted-foreground"}  ><LogOut /></Button></PopoverTrigger>
        <PopoverContent className="w-[70px] p-2 flex flex-col gap-2 justify-center" >
          <PopoverRadix.Close >
          <Button variant="outline" size="sm" ><X /></Button>
          </PopoverRadix.Close>
          <Button variant="outline" size="sm" onClick={async () => {
            await logout()
            mutate("/api/users/me", true)
          }}><Check />
          </Button>

        </PopoverContent>
      </Popover>

    )
      : (
        <Link href={`/login`}>
          <Button
            className={"min-w-[100px] "} size="sm" variant="outline">
            {t("signIn")}
          </Button>
        </Link>
      )
  )
}

export default SignIn;


