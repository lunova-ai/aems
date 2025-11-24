"use client";

import React from "react";

type AEMSCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;        // Hover-Effekt an/aus
  padding?: string;       // z. B. "p-4"
  noBorder?: boolean;     // Border aus
};

export default function AEMSCard({
  children,
  className = "",
  hover = true,
  padding = "p-6",
  noBorder = false,
  ...rest
}: AEMSCardProps) {
  const base = `
    rounded-2xl
    bg-white/5
    backdrop-blur-sm
    shadow-lg
    transition-all
    ${padding}
    ${noBorder ? "" : "border border-white/10"}
    ${rest.onClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-aems-neon/40" : ""}
  `;

  const hoverStyle = hover
    ? "hover:bg-white/10 hover:shadow-[0_0_10px_rgba(0,231,179,0.20)]"
    : "";

  return (
    <div
      {...rest}
      className={`${base} ${hoverStyle} ${className}`}
    >
      {children}
    </div>
  );
}
