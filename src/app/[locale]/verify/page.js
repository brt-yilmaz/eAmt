import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ModeSwitcher from "@/components/header/ModeSwitcher";
import NavBar from "@/components/header/NavBar";
import VerifyEmailPage from "@/components/verify/VerifyIdentityForm";
function VerifyIdentityForm() {
  return (
    <>
      <header
        className={
          "flex items-center justify-between px-10  py-[min(3vh,2rem)] sm:px-[min(3vh,2rem)]"
        }
      >
        <NavBar>
          <ModeSwitcher />
          <LanguageSwitcher />
        </NavBar>
      </header>
      <VerifyEmailPage />
    </>
  );
}
export default VerifyIdentityForm;