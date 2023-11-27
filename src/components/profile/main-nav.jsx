import Link from "next/link"

import { cn } from "@/lib/utils"
import UploadImageButton from "../ui/UploadImageButton"

export function MainNav({
  className,
  ...props
}) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard/profile"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>

    
     
      <Link
        href="/dashboard/profile/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
