import AboutTitle from "./AboutTitle";
import ButtonGroupNavBar from "./ButtonGroupNavBar";
import DocumentsTitle from "./DocumentsTitle";
import Logo from "./Logo";
import NavBar from "./NavBar";
import { NavigationTitles } from "./NavigationTitles";
import SignIn from "./SignIn";

function Header() {
  return (
    <header
      className={
        "flex items-center justify-between px-10  py-[min(3vh,2rem)] sm:px-[min(3vh,2rem)]"
      }
    >
      <Logo />
      <NavBar>
        <NavigationTitles />
        <ButtonGroupNavBar >
          <SignIn />
        </ButtonGroupNavBar>
      </NavBar>
    </header>
  );
}

export default Header;
