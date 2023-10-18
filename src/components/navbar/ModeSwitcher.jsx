"use client";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { useEffect, useState } from "react";

function ModeSwitcher() {
  const [theme, setTheme] = useState("system");
  const [showIcons, setShowIcons] = useState(false);

  const setDarkMode = () => {
    document.querySelector("html").setAttribute("data-theme", "dark");
    setTheme("dark");
    setShowIcons(false);
  };

  const setLightMode = () => {
    document.querySelector("html").setAttribute("data-theme", "light");
    setTheme("light");
    setShowIcons(false);
  };

  const setSystemMode = () => {
    document.querySelector("html").removeAttribute("data-theme");
    setTheme("system");
    setShowIcons(false);
  };

  // Let's use a useEffect to listen for changes in these interactions.
  useEffect(() => {
    const timer = setTimeout(() => setShowIcons(false), 5000);

    // Reset the timer on each new click.
    return () => clearTimeout(timer);
  }, [showIcons]);

  return (
    <div>
      {showIcons ? (
        <div className="flex flex-row items-center justify-center gap-2">
          <GrSystem
            className="text-3xl cursor-pointer"
            onClick={setSystemMode}
          />
          <MdDarkMode
            className="text-3xl cursor-pointer"
            onClick={setDarkMode}
          />
          <MdLightMode
            className="text-3xl cursor-pointer"
            onClick={setLightMode}
          />
        </div>
      ) : theme === "sysLogtem" ? (
        <GrSystem
          className={"text-3xl cursor-pointer "}
          onClick={() => setShowIcons(true)}
        />
      ) : theme === "dark" ? (
        <MdDarkMode
          className={"text-3xl cursor-pointer"}
          onClick={() => setShowIcons(true)}
        />
      ) : (
        <MdLightMode
          className={"text-3xl cursor-pointer"}
          onClick={() => setShowIcons(true)}
        />
      )}
    </div>
  );
}

export default ModeSwitcher;
