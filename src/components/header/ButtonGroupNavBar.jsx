'use client'
import React from "react";
import AvatarUser from "./Avatar";
import ModeToggle from "./ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageToggle } from "./LanguageToggle";
import { MultiLanguageSelector } from "./MultiLanguageSelector";
import AvatarDropDown from "./AvatarDropDown";
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
        <AvatarDropDown />
      </li>
    </>
  );
}

export default ButtonGroupNavBar;
