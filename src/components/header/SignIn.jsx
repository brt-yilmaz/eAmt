import { useTranslations } from "next-intl";

function SignIn() {
  const t = useTranslations("NavBar");
  return (
    <div>
      <button
        className={"py-2 px-4 min-w-[120px] bg-bgBut text-butContent rounded"}
      >
        {t("signIn")}
      </button>
    </div>
  );
}

export default SignIn;
