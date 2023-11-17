import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";


function SignIn() {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  return (

    <Link href={`/login`}>
      <Button
        className={"min-w-[100px] "} size="sm" variant="outline">
        {t("signIn")}
      </Button>
    </Link>
  );
}

export default SignIn;


