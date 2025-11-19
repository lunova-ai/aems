"use client";

import React from "react";

export default function AEMSBadge({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`
        inline-block
        px-3 py-1
        rounded-full
        text-xs font-semibold
        bg-white/10 
        text-white
        backdrop-blur-sm
        border border-white/10
        ${className}
      `}
    >
      {children}
    </span>
  );
}
