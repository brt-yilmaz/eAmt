'use client'
import React, { useState } from "react";
import sunIcon from "../../../public/Sun.svg";
import moonIcon from "../../../public/Moon.svg";
import "../../extra _styles/darkMode.css";
import Image from "next/image";
import { useTheme } from "next-themes"

function DarkMode() {
  const { theme, setTheme } = useTheme()
 

    return (
        <div className='dark_mode' role={"button"} onClick={() => setTheme("dark")}>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
            <span className="sr-only">Toggle theme</span>
                <Image src={sunIcon} alt='sun' width={20} className={"absolute z-50 top-[5.5px] left-[5.5px]"} />
                <Image src={moonIcon} alt='moon' width={20} className={"absolute z-50 right-[5.5px] top-[5.5px]"}/>
            </label>
        </div>
    );
};

export default DarkMode;