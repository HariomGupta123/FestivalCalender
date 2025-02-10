// src/components/Button.js
import React from "react";

// The Button component receives various props like text, color, and click handler
const Button = ({
  onClick,
  children,
  color = "blue",
  type = "button",
  className = "",
}) => {
  const buttonClass = className? className : `px-4 py-2 rounded-lg text-white transition-all ${
    color === "green"
      ? "bg-green-500 hover:bg-green-600"
      : color === "red"
      ? "bg-red-500 hover:bg-red-600"
      : color === "blue"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-gray-500 hover:bg-gray-600"
  } ${className}`;

  return (
    <button onClick={onClick} type={type} className={`${buttonClass} cursor-pointer` }>
      {children}
    </button>
  );
};

export default Button;
