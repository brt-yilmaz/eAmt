'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User2 } from 'lucide-react';
import { useUser } from "@/services/useUser";
import { cn } from "@/lib/utils"
import * as React from "react";

const  AvatarUser = React.forwardRef(({ className, ...props }, ref) => {

  const { user } = useUser();

  return (

    <Avatar ref={ref} className={ cn(className)} role="button">
      {user && <AvatarImage src={user.imageUrl} />}
      {!user && <AvatarFallback><User2 /></AvatarFallback>}
    </Avatar>

  )
})

export default AvatarUser;
