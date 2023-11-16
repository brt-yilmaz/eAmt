'use client';
import { useUser } from "@/services/useUser";

function IdentityCardWrapper({ children }) {

  const { user, isLoading } = useUser();


  return (
    (isLoading && (<div>Loading...</div>))
    ||
    (
      user?.documents?.length === 0 ? (
        <div>You have not uploaded any documents yet.</div>
      ) : (
        { children }
      )
    )
  );
}

export default IdentityCardWrapper;