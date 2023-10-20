"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function MenuButton({ showMenu, handleClick }) {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
    handleClick(!showMenu);
  };

  return (
    <button
      aria-controls={"navbar"}
      aria-expanded={expanded}
      onClick={toggleMenu}
      className={"sm:hidden absolute top-7 right-10 z-[9999]"}
    >
      <span className="sr-only">Menu</span>
      {showMenu ? (
        <AiOutlineClose className={"h-8 w-8 text-content"} />
      ) : (
        <RxHamburgerMenu className={"h-8 w-8 text-content"} />
      )}
    </button>
  );
}

export default MenuButton;
