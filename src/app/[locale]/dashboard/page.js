'use client';
import SearchPanel from "@/components/searchbar/SearchPanel";
import { upLoadImage } from "@/services/upLoadImage";
import { CldUploadWidget } from 'next-cloudinary';
import { useSWRConfig } from "swr"

export default function Dashboard() {
  const { mutate } = useSWRConfig();

  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-between p-24 ">
        <SearchPanel />

        <CldUploadWidget
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
              <button onClick={handleOnClick}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>




      </main>
    </>
  );
}
