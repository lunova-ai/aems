"use client";

import React from "react";

export default function AEMSSection({
  title,
  children,
  className = ""
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const id = title ? title.toLowerCase().replace(/\s+/g, "-") : undefined;

  return (
    <section
      className={`w-full ${className}`}
      aria-labelledby={id}
    >
      {title && (
        <h2
          id={id}
          className="
            text-xl font-semibold tracking-tight 
            text-white mb-4
          "
        >
          {title}
        </h2>
      )}

      {/* Inhalt */}
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

