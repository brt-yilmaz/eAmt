"use client";
import ButtonGroupNavBar from "./ButtonGroupNavBar";
import HomeTitle from "./HomeTitle";
import AboutTitle from "./AboutTitle";
import { useState } from "react";
import MenuButton from "./MenuButton";

function NavBar({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <MenuButton showMenu={showMenu} handleClick={setShowMenu} />
      <nav
        className={`fixed grow inset-0 left-1/3 sm:static sm:bg-[inherit] py-[min(30vh,10rem)] sm:p-0 bg-bgSideBar backdrop-blur-sm ${
          showMenu ? "block" : "hidden"
        } sm:flex justify-end`}
      >
        <ul
          id={"navbar"}
          className={`flex flex-col-reverse sm:flex-row items-center gap-10 sm:gap-6 text-content `}
        >
          {children}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
