'use client'
import React from "react";
import Avatar from "./Avatar";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageToggle } from "./LanguageToggle";
import { MultiLanguageSelector } from "./MultiLanguageSelector";
function ButtonGroupNavBar({children}) {
  return (
    <>
      <li>
        <ModeToggle />
      </li>
      <li className="flex items-center gap-1">
        <LanguageToggle />
        <MultiLanguageSelector />
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
