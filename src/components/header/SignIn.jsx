import { useTranslations } from "next-intl";

function SignIn() {
  const t = useTranslations("NavBar");
  return (
    <div>
      <button
        className={"py-1 px-2 min-w-[100px] bg-bgBut text-butContent rounded"}
      >
        {t("signIn")}
      </button>
    </div>
  );
}

export default SignIn;
