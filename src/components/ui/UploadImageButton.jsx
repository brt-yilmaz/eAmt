import { upLoadImage } from "@/services/upLoadImage";
import { CldUploadWidget } from "next-cloudinary";

function UploadImageButton() {
  return (
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
          Upload Profile Photo
        </button>
      );
    }}
  </CldUploadWidget>
  );
}

export default UploadImageButton;
