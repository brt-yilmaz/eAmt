'use client';
import Image from "next/image";
import { useUser } from "@/services/useUser";
import { Link } from "@/navigation";

function IdentityCard() {

  const mainImage = "https://res.cloudinary.com/de85rx4u1/image/upload/bo_1px_solid_rgb:000,e_blur_faces:2000,o_100/v1700122361/personalausweis_vorderseite_ab_august_2021_jocdvc.jpg"

  const { user, isLoading } = useUser();

  return (
    (isLoading && (<div>Loading...</div>))
    ||
    <div>
      (user?.documents?.identity === null ? (
      return <div>
        <p>You have not uploaded an identity yet.</p>
        <Link
        <button className={"py-1 px-2 min-w-[100px] bg-bgBut text-butContent rounded"}> Apply for identity </button>
      </div>
      ):
      <Image src={user?.documents?.identity.imageUrl} alt="identity" width={400} height={252} className={"rounded-2xl"} />

      )

    </div>
  );
}

export default IdentityCard;