'use client'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { languageToggleHandler } from "@/helpers/LanguageToggleHandler";



export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  
  return (
    <ToggleGroup type="single" className="hidden md:block">
      <ToggleGroupItem value="bold" aria-label="Toggle English" role="button" className={`${locale === "en" ? "text-base bg-accent text-accent-foreground" : ""}`} size={`${locale === "en" ? "sm" : ""}`} onClick={() => router.push(languageToggleHandler(locale, pathname, "en"))}>
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Deutsch umschalten" role="button" className={`${locale === "de" ? "text-base bg-accent text-accent-foreground" : ""}`} size={`${locale === "de" ? "sm" : ""}`} onClick={() => router.push(languageToggleHandler(locale, pathname, "de"))}>
        DE
      </ToggleGroupItem>
     
    </ToggleGroup>
  )
}
