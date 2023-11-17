'use client'
import React from "react";
import SignIn from "./SignIn";
import Avatar from "./Avatar";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
function ButtonGroupNavBar({children}) {
  return (
    <>
      <li>
        <ModeToggle />
      </li>
      <li>
        <LanguageSwitcher />
      </li>
      <li>
        {children}
      </li>
      <li>
        <Avatar />
      </li>
    </>
  );
}

export default ButtonGroupNavBar;
