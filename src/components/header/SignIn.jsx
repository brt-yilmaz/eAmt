import { useTranslations } from "next-intl";
import Link from "next/link";

function SignIn() {
  const t = useTranslations("NavBar");
  return (
    <div>
      <button
        className={"py-1 px-2 min-w-[100px] bg-bgBut text-butContent rounded"}>
        <Link href={`/en/login`}>{t("signIn")}</Link>
      </button>
    </div>
  );
}

export default SignIn;


