import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";

function DocumentsTitle() {
  const t = useTranslations("NavBar");
  return (
    <li className={"sm:mr-auto min-w-[90px] text-center"}>
      <Link href={`/dashboard/documents`}>{t("documents")}</Link>
    </li>
  );
}

export default DocumentsTitle;
