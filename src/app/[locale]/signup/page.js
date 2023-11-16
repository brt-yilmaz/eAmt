
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ModeSwitcher from "@/components/header/ModeSwitcher";
import NavBar from "@/components/header/NavBar";
import SignupPage from '@/components/signup/SignUp'
function SignUp() {
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
      <SignupPage />
    </>
  );
}

export default SignUp;

