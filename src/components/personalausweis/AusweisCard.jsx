'use client'
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
    <Card className="w-[290px] bg-gradient-to-br from-black via-yellow-700 to-red-500" >
      <CardHeader>
        <CardTitle>PERSONALAUSWEIS</CardTitle>
        <CardDescription>BUNDESREPUBLIC DEUTSCHLAND</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-col">
          <div className="flex gap-6">
            <Image src={user?.identity?.imageUrl} alt="Profile image" height={50} width={120} className={"rounded-md "} />
            <div className="flex flex-col  ">
              <Label className="text-xs font-medium text-muted-foreground">Geburtsdatum</Label>
              <Label className="text-sm mb-1">
                {user?.identity?.dateOfBirth}
              </Label>
              <Label className="text-xs font-medium text-muted-foreground">Geburtsort</Label>
              <Label className="text-sm mb-1">
                {user?.identity?.placeOfBirth}
              </Label>
              <Label className="text-xs text-muted-foreground  font-medium">Nationalität</Label>
              <Label className="text-sm ">
                {user?.identity?.nationality}
              </Label>
            </div>



          </div>
          <div className="flex flex-col gap-1">

          </div>
          <div className="flex gap-14 ">
          <div className="flex flex-col gap-1">
             <Label className="text-2xl text-muted-foreground">
            {user?.identity?.surname}
          </Label>
          <Label className="text-2xl text-muted-foreground">
            {user?.identity?.firstName}
          </Label>
          </div>
          <div>
            <Image src={user?.signature} alt="Profile image" height={50} width={100} className={"rounded-md "} />
          </div>

          </div>
        </div>
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  )
}
