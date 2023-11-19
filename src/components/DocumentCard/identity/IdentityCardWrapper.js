'use client';
import { Link } from "@/navigation";
import { useUser } from "@/services/useUser";

function IdentityCardWrapper({ children }) {

  const { user, isLoading } = useUser();


  return (
    (isLoading && (<div>Loading...</div>))
    ||
    (
      user?.documents?.length === 0 && (
        <div>
          <p>You have not uploaded any documents yet.</p>
          <Link href="/dashboard/documents/identity" ><button className={"py-1 px-2 min-w-[100px] bg-bgBut text-butContent rounded"}> Apply for documents </button> </Link>
        </div>
      )
    )
    ||
    (
      <div>
        {children}
      </div>
    )

  );
}

export default IdentityCardWrapper;