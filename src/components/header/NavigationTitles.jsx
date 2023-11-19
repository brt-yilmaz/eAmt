"use client"

import * as React from "react"
import { useTranslations } from "next-intl";
import logo from "../../../public/logo.png";
import { Link } from "@/navigation";

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Logo from "./Logo";
import Image from "next/image";

const components = [
  { "title": "identity", "href": "identity" },
  { "title": "driversLicense", "href": "drivers-license" },
  { "title": "insuranceCard", "href": "insurance-card" },
  { "title": "carDocuments", "href": "car-documents" },
  { "title": "titleDeed", "href": "title-deed" },
  { "title": "universityDiploma", "href": "university-diploma" }
]

export function NavigationTitles() {
  const t = useTranslations("NavBar");
  console.log(t(`documentsHover.items.universityDiploma.title`))
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("about")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-around rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div>
                      <Image
                        src={logo}
                        alt="logo"
                        width={100}
                        className="rounded-md"
                      />
                    </div>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      eAmt             </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t("aboutHover.slogan")}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dashboard/about#introduction" title={`${t("aboutHover.introduction.title")}`}>
                {t("aboutHover.introduction.content")}
              </ListItem>
              <ListItem href="/dashboard/about#whoWeAre" title={t("aboutHover.whoWeAre.title")}>
                {t("aboutHover.whoWeAre.content")}
              </ListItem>
              <ListItem href="/dashboard/about#whatWeOffer" title={t("aboutHover.whatWeOffer.title")}>
                {t("aboutHover.whatWeOffer.content")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t(("documents"))}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2  ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={t(`documentsHover.items.${component.title}.title`)}
                  href={`/dashboard/documents/${component.href}`}
                >
                  {t(`documentsHover.items.${component.title}.content`)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <p className={"min-w-[100px] text-center"}>{t("appointments")}</p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
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
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
