import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { useLocale } from "next-intl";

function Logo() {
  const locale = useLocale();
  return (
    <div className={"w-14 shrink-0"}>
      <Link href={`/${locale}`}>
        <Image src={logo} alt="logo" width={50} className={"rounded-md"} />
      </Link>
    </div>
  );
}
export default Logo;
