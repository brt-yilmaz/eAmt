'use client'
import React from "react";
import Avatar from "./Avatar";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageToggle } from "./LanguageToggle";
function ButtonGroupNavBar({children}) {
  return (
    <>
      <li>
        <ModeToggle />
      </li>
      <li>
        <LanguageToggle />
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
