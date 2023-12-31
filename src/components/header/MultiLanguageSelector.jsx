"use client"
import { Languages } from 'lucide-react';
import * as React from "react"
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { locales } from "@/navigation";
import { localesDescription } from "@/navigation";
import { languageToggleHandler } from "@/helpers/LanguageToggleHandler";
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu-multiLanguage"


export function MultiLanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger><Languages className={'md:hidden text-muted-foreground'}/></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid  p-2  ">
             
              {locales.map((localeFromArray) => (
                <ListItem
                  key={localeFromArray}
                  title={localesDescription[localeFromArray]}
                  onClick={()=>router.push(languageToggleHandler(locale, pathname, localeFromArray))}
                />
              ))}
                
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
      <NavigationMenuLink  asChild>
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
