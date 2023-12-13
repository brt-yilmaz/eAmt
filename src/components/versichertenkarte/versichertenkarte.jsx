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

import Image from "next/image"


export default function Versichertenkarte() {
  const image = 'https://res.cloudinary.com/de85rx4u1/image/upload/v1701045426/profilerkek_ce3k4z.jpg'


  return (
    <Card className="w-[290px] bg-gradient-to-br from-slate-300 via-green-400-600 to-green-900" >
      <CardHeader>
        <CardTitle>Versichertenkarte</CardTitle>
        <CardDescription>BUNDESREPUBLIC DEUTSCHLAND</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 flex-col">
          <div className="flex gap-6">
            <Image src={image} alt="Profile image" height={50} width={120} className={"rounded-md "} />
            <div className="flex flex-col  ">
              <Label className="text-xs font-medium text-muted-foreground">Geburtsdatum</Label>
              <Label className="text-sm mb-1">
                02.04.1988
              </Label>
              <Label className="text-xs font-medium text-muted-foreground">Geburtsort</Label>
              <Label className="text-sm mb-1">
                Izmit
              </Label>
              <Label className="text-xs text-muted-foreground  font-medium">Nationalität</Label>
              <Label className="text-sm ">
                Türkei
              </Label>
            </div>



          </div>
          <div className="flex flex-col gap-1">

          </div>
          <div className="flex gap-14 ">
          <div className="flex flex-col gap-1">
             <Label className="text-2xl text-muted-foreground">
            Yilmaz
          </Label>
          <Label className="text-2xl text-muted-foreground">
            Berat
          </Label>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <Label className="text-sm text-muted-foreground ">AOK</Label>
            <Label className="text-lg ">123 456 789</Label>
          </div>

          </div>
        </div>
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  )
}
