import { useTranslations } from "next-intl";

function UploadImageButton() {
  const t = useTranslations("Dashboard");
  return (
    <button onClick={handleOnClick}>
                {t("uploadButton")}
              </button>
  );
}

export default UploadImageButton;
