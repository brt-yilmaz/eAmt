/* 
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ModeToggle from "@/components/header/ModeToggle";
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
          <ModeToggle />
          <LanguageSwitcher />
        </NavBar>
      </header>
      <SignupPage />
    </>
  );
}

export default SignUp;
 */


import ModeToggle from "@/components/header/ModeToggle";
import SignupPage from "@/components/signup/SignUp";




const page = () => {
  return (
    <>
    <header
      className={
        "flex items-center justify-between px-10  py-[min(3vh,2rem)] sm:px-[min(3vh,2rem)]"
      }
    >
      <NavBar>
        <ModeToggle />
        <LanguageSwitcher />
      </NavBar>
    </header>
    <SignupPage />
  </>
  )
}

export default SignupPage