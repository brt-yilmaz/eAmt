import { CldUploadWidget } from "next-cloudinary";
import { useSWRConfig } from "swr";
import { useToast } from '@/components/ui/use-toast';
import { uploadIdentityImage } from "@/services/uploadIdentityImage";

function UploadImageButton() {
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  return (
    <CldUploadWidget
    uploadPreset="mnklsx0o"
    onSuccess={async (result, { widget }) => {
      console.log(result.info.url)
      await uploadIdentityImage(result?.info?.url);
      mutate("/api/users/me", true);
      toast({
        title: "Identity Photo Uploaded",
        description: "Your identity photo has been uploaded successfully.",
        status: "success",
        duration: 3000,
      });
      widget.close();
    }}
    options={{
      sources: ['local', 'url'],
      maxFiles: 1,
    }}
    
  >
    {({ open }) => {
      function handleOnClick(e) {
        e.preventDefault();
        open();
      }
      return (
        <button onClick={handleOnClick}>
          <p className={'underline'}>Upload Identity Photo</p>
        </button>
      );
    }}
  </CldUploadWidget>
  );
}

export default UploadImageButton;
