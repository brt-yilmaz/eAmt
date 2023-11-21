/* import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ModeToggle from "@/components/header/ModeToggle";
import NavBar from "@/components/header/NavBar";
import LoginPage from "@/components/login/Login";
function Login() {
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
      <LoginPage />
    </>
  );
}
export default Login; */


import ModeToggle from "@/components/header/ModeToggle";
import LoginPage from "@/components/login/Login";



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
    <LoginPage />
  </>
  )
}

export default LoginPage