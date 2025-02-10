// src/components/Input.js
import React from "react";

// The Input component takes various props such as type, value, placeholder, and a change handler
const Input = ({
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
