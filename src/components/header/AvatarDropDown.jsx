'use client'
import {
  CreditCard,
  Keyboard,
  LogOut,
  Settings,
  User,
  CalendarSearch,
  CalendarPlus,
  KeyRound
} from "lucide-react"
import { logout } from "@/services/logout";
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User2 } from 'lucide-react';
import { useUser } from "@/services/useUser";
import { useLocale } from "next-intl"
import { useRouter } from "@/navigation";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function AvatarDropDown() {
const { mutate } = useSWRConfig();

  const locale =  useLocale();
  const router = useRouter();
  const t = useTranslations("NavBar");
  const { user } = useUser();
  console.log(user)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar role="button">
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback><User2 /></AvatarFallback>
    </Avatar> 
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("avatarDropDown.myAccount")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={!user} >
            <User className="mr-2 h-4 w-4" />
            <span onClick={() => router.push("/dashboard/profile")}>{t("avatarDropDown.profile")}</span>
            <DropdownMenuShortcut>{!user && <KeyRound size={16}/>}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!user} >
            <CreditCard className="mr-2 h-4 w-4" />
            <span onClick={() => router.push("/dashboard/documents") }>{t("avatarDropDown.documents")}</span>
            <DropdownMenuShortcut>{!user && <KeyRound size={16}/>}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span onClick={() => router.push("/dashboard/profile/settings")}>{ t("avatarDropDown.settings")}</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span onClick={() => router.push("/dashboard/petition")}>{t("avatarDropDown.petition")}</span>
            <DropdownMenuShortcut></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={!user} >
            <CalendarSearch className="mr-2 h-4 w-4" />
            <span onClick={() => router.push("/dashboard/appointments")}>{t("avatarDropDown.appointments")}</span>
            <DropdownMenuShortcut> {!user && <KeyRound size={16}/>} </DropdownMenuShortcut>

          </DropdownMenuItem>
          
          <DropdownMenuItem disabled={!user} >
          <CalendarPlus className="mr-2 h-4 w-4" />
              <span onClick={() => router.push("/dashboard/appointments/new") }> {t("avatarDropDown.newAppointment")} </span>
            <DropdownMenuShortcut>{!user && <KeyRound size={16}/>}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span onClick={async () => {
              await logout()
              mutate("/api/users/me", true)
              router.push("/dashboard")
            }}> {t("avatarDropDown.logout")} </span>
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
