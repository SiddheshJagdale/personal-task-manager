import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

const buttonStyles = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-white text-blue-600",
  ghost: "bg-transparent text-blue-600",
};

const buttonSizes = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  onClick,
}) => {
  return (
    <button
      className={`rounded ${buttonStyles[variant]} ${buttonSizes[size]} border-none cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
