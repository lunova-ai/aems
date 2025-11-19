"use client";

import React, { ReactNode } from "react";

type AEMSHeaderProps = {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  className?: string;
  center?: boolean;
};

export default function AEMSHeader({
  title,
  subtitle,
  className = "",
  center = false,
}: AEMSHeaderProps) {
  return (
    <header
      className={`mb-10 ${center ? "text-center" : ""} ${className}`}
      role="heading"
      aria-level={1}
    >
      <h1 className="text-3xl font-semibold tracking-tight leading-snug">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm mt-2 leading-relaxed max-w-3xl text-[color:var(--aems-text-muted)]">
          {subtitle}
        </p>
      )}
    </header>
  );
}

