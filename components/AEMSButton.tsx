"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function AEMSButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button"
}: ButtonProps) {
  const base = `
    px-4 py-2 rounded-lg font-medium select-none
    transition-all duration-200
    focus:outline-none
    focus:ring-2 focus:ring-aems-neon/60
    ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"}
  `;

  const variants: Record<string, string> = {
    primary: `
      bg-aems-neon text-black 
      hover:bg-aems-soft 
      shadow-[0_0_10px_rgba(0,231,179,0.45)]
      ${disabled ? "shadow-none" : ""}
    `,
    secondary: `
      bg-white/10 text-white
      hover:bg-white/20
      border border-white/10
    `,
    ghost: `
      text-white/90
      hover:text-white 
      hover:bg-white/10
    `
  };

  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

