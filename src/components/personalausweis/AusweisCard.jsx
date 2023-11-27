'use client'
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useUser } from "@/services/useUser"
import Image from "next/image"


export default function AusweisCard() {
  const { user } = useUser();



  console.log(user)

  return (
    <Card className="w-[290px]" >
      <CardHeader>
        <CardTitle>PERSONALAUSWEIS</CardTitle>
        <CardDescription>BUNDESREPUBLIC DEUTSCHLAND</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-col">
          <div className="flex gap-6">
            <Image src={user?.documents[0]?.imageUrl} alt="Profile image" height={50} width={120} className={"rounded-md "} />
            <div className="flex flex-col  ">
              <Label className="text-xs font-medium text-muted-foreground">Geburtsdatum</Label>
              <Label className="text-sm mb-1">
                {user?.documents[0]?.dateOfBirth}
              </Label>
              <Label className="text-xs font-medium text-muted-foreground">Geburtsort</Label>
              <Label className="text-sm mb-1">
                {user?.documents[0]?.placeOfBirth}
              </Label>
              <Label className="text-xs text-muted-foreground  font-medium">Nationalität</Label>
              <Label className="text-sm ">
                {user?.documents[0]?.nationality}
              </Label>
            </div>



          </div>
          <div className="flex flex-col gap-1">

          </div>
          <div className="flex flex-col ">

          <Label className="text-2xl text-muted-foreground">
            {user?.documents[0]?.surname}
          </Label>
          <Label className="text-2xl text-muted-foreground">
            {user?.documents[0]?.firstName}
          </Label>

          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
