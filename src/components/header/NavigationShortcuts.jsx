"use client"

import * as React from "react"
import { Link } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { locales } from "@/navigation";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { NavigationTitles } from "./NavigationTitles";


export function NavigationShortcuts() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('NavBar');
  return (
    <NavigationMenu className="lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger> Shortcuts</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex gap-3 p-1 flex-col ">


              <ListItem
                title={t("about")}
                onClick={() => router.push(`/${locale}/dashboard/about`)}
                className= "whitespace-nowrap"
              />

              <ListItem
                title={t("documents")}
                onClick={() => router.push(`/${locale}/dashboard/profile/documents`)}
              />

              <ListItem
                title={t("appointments")}
                onClick={() => router.push(`/${locale}/dashboard/profile/appointments`)}
              />


            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
