'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User2 } from 'lucide-react';
import { useUser } from "@/services/useUser";
function AvatarUser() {

  const { user } = useUser();

  return (

    <Avatar role="button">
      {user && <AvatarImage src={user.imageUrl} />}
      {!user && <AvatarFallback><User2 /></AvatarFallback>}
    </Avatar>

  )
}
export default AvatarUser;
