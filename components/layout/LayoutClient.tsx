"use client";

import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="aems-page">
      {children}
    </div>
  );
}
