import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

function AboutTitle() {
  const locale = useLocale();
  console.log(locale);
  const t = useTranslations("NavBar");
  return (
    <li className={"sm:mr-auto min-w-[90px] text-center"}>
      <Link href={`/${locale}/about`}>{t("about")}</Link>
    </li>
  );
}

export default AboutTitle;