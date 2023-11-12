// FormInput.js
import React, { useState } from "react";
import { OpenEyeIcon, ClosedEyeIcon } from "@/app/library/EyeIcons";

export default function FormInput({ label, value, onChange, errors, isPassword = false }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={label} className="text-white text-lg mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 text-black w-full pr-10"
          id={label}
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
        />
        {isPassword && (
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-400 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? ClosedEyeIcon : OpenEyeIcon}
          </button>
        )}
      </div>
      {errors && <p className="text-red-500">{errors}</p>}
    </div>
  );
}
