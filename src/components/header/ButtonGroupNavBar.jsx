import React from "react";
import ModeSwitcher from "./ModeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import SignIn from "./SignIn";
import Avatar from "./Avatar";
function ButtonGroupNavBar() {
  return (
    <>
      <li>
        <ModeSwitcher />
      </li>
      <li>
        <LanguageSwitcher />
      </li>
      <li>
        <SignIn />
      </li>
      <li>
        <Avatar />
      </li>
    </>
  );
}

export default ButtonGroupNavBar;
