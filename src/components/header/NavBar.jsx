import { useTranslations } from "next-intl";
import Link from "next/link";
import ButtonGroupNavBar from "./ButtonGroupNavBar";

function NavBar() {
  const t = useTranslations("NavBar");
  return (
    <nav
      className={
        "fixed grow inset-0 left-1/3 sm:static sm:bg-[inherit] p-[min(30vh,10rem)] sm:p-0 bg-bgSideBar backdrop-blur-lg"
      }
    >
      <ul
        className={
          "flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-6 text-content "
        }
      >
        <li className={"sm:ml-auto min-w-[120px] text-center"}>
          <Link href="/">{t("home")}</Link>
        </li>
        <li className={"sm:mr-auto min-w-[120px] text-center"}>
          <Link href="/about">{t("about")}</Link>
        </li>
        <ButtonGroupNavBar />
      </ul>
    </nav>
  );
}

export default NavBar;
