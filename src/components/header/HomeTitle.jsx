import { useTranslations } from "next-intl";
import Link from "next/link";

function HomeTitle() {
  const t = useTranslations("NavBar");
  return (
    <li className={"sm:ml-auto min-w-[90px] text-center"}>
      <Link href="/">{t("home")}</Link>
    </li>
  );
}

export default HomeTitle;
