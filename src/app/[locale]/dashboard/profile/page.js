'use client';
import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/profile/date-range-picker";
import { MainNav } from "@/components/profile/main-nav";
import { RecentSales } from "@/components/profile/recent-sales";
import { Search } from "@/components/profile/search";
import FamilyMemberSwitcher from "@/components/profile/FamilyMemberSwitcher";
import { UserNav } from "@/components/profile/user-nav";

import { useUser } from "@/services/useUser";
import AusweisForm from "@/components/personalausweis/AusweisForm";
import AusweisCard from "@/components/personalausweis/AusweisCard";
import DriverLicense from "@/components/driverLicence/driverLicence";
import Versichertenkarte from "@/components/versichertenkarte/versichertenkarte";
import UploadImageButton from "@/components/ui/UploadImageButton";

function ProfilePage() {
  const { user } = useUser();

  return (
    <>
      <div className="flex flex-col w-full
      ">
        <div className="border-b mx-8">
          <div className="flex h-16 items-center ">
            <FamilyMemberSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight hidden sm:block">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="pr-4">
              <TabsTrigger className="mr-6" value="overview">Overview</TabsTrigger>
              <UploadImageButton />
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {user?.identity?.surname && <AusweisCard />}

              </div>
              <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-7">
                <Card className="col-span-5">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2 flex gap-4">
                    {user?.identity?.surname && <AusweisCard />}
                    <DriverLicense />
                    <Versichertenkarte />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Friends</CardTitle>
                    <CardDescription>
                      You have 5 new contacts in this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )


}

export default ProfilePage;
