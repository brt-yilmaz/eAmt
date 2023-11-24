'use client';
import DocumentCardsWrapper from "@/components/DocumentCard/DocumentCardsWrapper";
import SignUp from "@/components/signup/SignUpBerat";
import { Button } from "@/components/ui/button";
import Verification from "@/components/verification/verification";
import { upLoadImage } from "@/services/upLoadImage";
import { CldUploadWidget } from 'next-cloudinary';
import { useSWRConfig } from "swr"

function Dashboard() {
  const { mutate } = useSWRConfig();

  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-between p-24 ">


        {/* <CldUploadWidget
          uploadPreset="mnklsx0o"
          onSuccess={async (result, { widget }) => {
            await upLoadImage(result?.info?.url);
            mutate("/api/users/me", true);
            widget.close();
          }}
          options={{
            sources: ['local', 'url'],
            maxFiles: 1,
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <button onClick={handleOnClick} className={"py-1 px-2 min-w-[100px] bg-bgBut text-butContent rounded"}>
                Upload Profile Photo
              </button>
            );
          }}
        </CldUploadWidget> */}


      </main>
    </>
  );
}

export default Dashboard