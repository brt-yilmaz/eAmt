"use client";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { useState } from "react";

function ModeSwitcher() {
  const [theme, setTheme] = useState("system");

  const setDarkMode = () => {
    document.querySelector("html").setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("html").setAttribute("data-theme", "light");
  };

  const setSystemMode = () => {
    document.querySelector("html").removeAttribute("data-theme");
  };

  return (
    <div>
      {theme === "system" ? (
        <GrSystem className={"text-2xl"} onClick={setSystemMode} />
      ) : theme === "dark" ? (
        <MdDarkMode className={"text-2xl"} onClick={setDarkMode} />
      ) : (
        <MdLightMode className={"text-2xl"} onClick={setLightMode} />
      )}
    </div>
  );
}

export default ModeSwitcher;
