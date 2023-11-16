'use client';
import { RxAvatar } from "react-icons/rx";
import { useUser } from "@/services/useUser";
function Avatar() {
  
  const { user } = useUser();

  return (
    
     (user?.imageUrl ?
      (<div>
        <img src={user.imageUrl} className={"rounded-full w-10 h-10"} alt="avatar" />
      </div>)
      :
      (<div>
        <RxAvatar className={"text-4xl text-content "} />
      </div>)
      
      )
    
  )
}
export default Avatar;
