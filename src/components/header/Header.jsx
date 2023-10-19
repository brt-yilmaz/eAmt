import Logo from "./Logo";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className={"flex items-center justify-between py-6 px-16"}>
      <Logo />
      <NavBar />
    </header>
  );
}

export default Header;
