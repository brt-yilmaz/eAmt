import AboutTitle from "./AboutTitle";
import ButtonGroupNavBar from "./ButtonGroupNavBar";
import DocumentsTitle from "./DocumentsTitle";
import Logo from "./Logo";
import NavBar from "./NavBar";

function Header() {
  return (
    <header
      className={
        "flex items-center justify-between px-10  py-[min(3vh,2rem)] sm:px-[min(3vh,2rem)]"
      }
    >
      <Logo />
      <NavBar>
        <AboutTitle />
        <DocumentsTitle />
        <ButtonGroupNavBar />
      </NavBar>
    </header>
  );
}

export default Header;
