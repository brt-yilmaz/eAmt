import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

function AboutTitle() {
  const locale = useLocale();
  const t = useTranslations("NavBar");
  return (
    <li className={"sm:mr-auto min-w-[90px] text-center"}>
      <Link href={`/${locale}/dashboard/about`}>{t("about")}</Link>
    </li>
  );
}

export default AboutTitle;
