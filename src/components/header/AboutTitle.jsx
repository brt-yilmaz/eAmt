import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";

function AboutTitle() {
  const t = useTranslations("NavBar");
  return (
    <li className={"sm:mr-auto min-w-[90px] text-center"}>
      <Link href={`/dashboard/about`}>{t("about")}</Link>
    </li>
  );
}

export default AboutTitle;
