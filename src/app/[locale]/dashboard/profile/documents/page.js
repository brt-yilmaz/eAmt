'use client'
import { useUser } from "@/services/useUser"

import AusweisCard from "@/components/personalausweis/AusweisCard";
import { Button } from "@/components/ui/button";

function Documents() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  if (!user.identity.surname) {
    return <Button className="w-full">Apply for e-Identity</Button>;
  }

  return (
    <AusweisCard />
  );
}

export default Documents;
